import { checkRateLimit } from "@vercel/firewall";
import { NextRequest, NextResponse } from "next/server";
import {
  getFriendlySubmitError,
  getValidationErrorsFromPayload,
  isValidEmail,
} from "@/lib/form-errors";

const HUBSPOT_API_KEY = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
const HUBSPOT_RATE_LIMIT_ID = "hubspot-submit-form";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle?: string;
  location?: string;
  industry?: string;
  registrationType: "fleet" | "corporate" | "lead";
}

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const isRegistrationType = (
  value: unknown,
): value is FormData["registrationType"] =>
  value === "fleet" || value === "corporate" || value === "lead";

function normalizeFormData(payload: unknown): FormData | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const candidate = payload as Record<string, unknown>;

  if (
    !isNonEmptyString(candidate.firstName) ||
    !isNonEmptyString(candidate.lastName) ||
    !isNonEmptyString(candidate.email) ||
    !isNonEmptyString(candidate.company) ||
    !isRegistrationType(candidate.registrationType)
  ) {
    return null;
  }

  if (
    candidate.registrationType === "lead" &&
    !isNonEmptyString(candidate.jobTitle)
  ) {
    return null;
  }

  const normalized: FormData = {
    firstName: candidate.firstName.trim(),
    lastName: candidate.lastName.trim(),
    email: candidate.email.trim().toLowerCase(),
    phone: isNonEmptyString(candidate.phone) ? candidate.phone.trim() : "",
    company: candidate.company.trim(),
    registrationType: candidate.registrationType,
  };

  if (isNonEmptyString(candidate.jobTitle)) {
    normalized.jobTitle = candidate.jobTitle.trim();
  }

  if (isNonEmptyString(candidate.location)) {
    normalized.location = candidate.location.trim();
  }

  if (isNonEmptyString(candidate.industry)) {
    normalized.industry = candidate.industry.trim();
  }

  return normalized;
}

async function submitToHubSpot(data: FormData) {
  if (!HUBSPOT_API_KEY) {
    throw new Error("Missing HUBSPOT_PRIVATE_APP_TOKEN");
  }

  try {
    const properties: Record<string, any> = {
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      phone: data.phone,
      company: data.company,
      lifecyclestage: "lead",
      hs_lead_status: "NEW",
    };

    if (data.jobTitle) properties.jobtitle = data.jobTitle;
    if (data.location) properties.location = data.location;
    if (data.industry) properties.industry = data.industry;

    // HubSpot's registration_type property only allows "fleet" | "corporate".
    // Leads from /leads are tagged via source instead.
    if (data.registrationType === "fleet" || data.registrationType === "corporate") {
      properties.registration_type = data.registrationType;
    }

    const today = new Date().toISOString().split("T")[0];
    properties.registration_date = today;
    properties.source =
      data.registrationType === "lead" ? "blackhorse_leads" : "blackhorse_landing";

    const response = await fetch(
      "https://api.hubapi.com/crm/v3/objects/contacts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HUBSPOT_API_KEY}`,
        },
        body: JSON.stringify({ properties }),
      },
    );

    let responseText = "";
    try {
      responseText = await response.text();
    } catch {
      responseText = response.statusText;
    }

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

      try {
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.message || errorData.category || errorMessage;
      } catch {
        errorMessage = responseText || errorMessage;
      }

      console.error("HubSpot API Error:", errorMessage);
      throw new Error(errorMessage);
    }

    const result = JSON.parse(responseText);
    // console.log("HubSpot response:", result);
    return result;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Error submitting to HubSpot:", message);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!HUBSPOT_API_KEY) {
      return NextResponse.json(
        { error: "HubSpot configuration missing. Please contact support." },
        { status: 500 },
      );
    }

    try {
      const { rateLimited } = await checkRateLimit(HUBSPOT_RATE_LIMIT_ID, {
        request,
      });

      if (rateLimited) {
        return NextResponse.json(
          { error: "Too many requests. Please try again later." },
          { status: 429, headers: { "Retry-After": "60" } },
        );
      }
    } catch (error) {
      console.warn("Rate limit check unavailable:", error);
    }

    let payload: unknown;
    try {
      payload = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 },
      );
    }

    const candidate =
      payload && typeof payload === "object"
        ? (payload as Record<string, unknown>)
        : null;

    if (!candidate) {
      return NextResponse.json(
        {
          error:
            "We couldn't read your submission. Please refresh the page and try again.",
        },
        { status: 400 },
      );
    }

    const fieldErrors = getValidationErrorsFromPayload(candidate);
    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json(
        {
          error: "Please fix the highlighted fields below and try again.",
          fieldErrors,
        },
        { status: 400 },
      );
    }

    const data = normalizeFormData(payload);

    if (!data) {
      return NextResponse.json(
        {
          error:
            "Some required information is missing. Please review the form and try again.",
        },
        { status: 400 },
      );
    }

    if (!isValidEmail(data.email)) {
      return NextResponse.json(
        {
          error:
            "That email address doesn't look valid. Please check it and try again.",
          fieldErrors: {
            email:
              "Please enter a valid email address (e.g. name@company.com).",
          },
        },
        { status: 400 },
      );
    }

    const result = await submitToHubSpot(data);

    return NextResponse.json(
      {
        success: true,
        message: "Contact submitted to HubSpot successfully",
        contactId: result.id,
      },
      { status: 200 },
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const friendly = getFriendlySubmitError(500, { error: errorMessage });

    return NextResponse.json(friendly, { status: 500 });
  }
}
