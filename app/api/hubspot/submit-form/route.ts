import { checkRateLimit } from "@vercel/firewall";
import { NextRequest, NextResponse } from "next/server";

const HUBSPOT_API_KEY = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HUBSPOT_RATE_LIMIT_ID = "hubspot-submit-form";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  location?: string;
  industry?: string;
  registrationType: "fleet" | "corporate";
}

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const isValidEmail = (email: string) => EMAIL_REGEX.test(email.trim());

const isRegistrationType = (
  value: unknown,
): value is FormData["registrationType"] =>
  value === "fleet" || value === "corporate";

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

  const normalized: FormData = {
    firstName: candidate.firstName.trim(),
    lastName: candidate.lastName.trim(),
    email: candidate.email.trim().toLowerCase(),
    phone: isNonEmptyString(candidate.phone) ? candidate.phone.trim() : "",
    company: candidate.company.trim(),
    registrationType: candidate.registrationType,
  };

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

    if (data.location) properties.location = data.location;
    if (data.industry) properties.industry = data.industry;
    if (data.registrationType)
      properties.registration_type = data.registrationType;

    const today = new Date().toISOString().split("T")[0];
    properties.registration_date = today;
    properties.source = "blackhorse_landing";

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

    const data = normalizeFormData(payload);

    if (!data) {
      return NextResponse.json(
        {
          error:
            "Missing or invalid required fields: firstName, lastName, email, company, registrationType",
        },
        { status: 400 },
      );
    }

    if (!isValidEmail(data.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
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
    const isDev = process.env.NODE_ENV !== "production";
    const errorMessage = error instanceof Error ? error.message : String(error);

    return NextResponse.json(
      {
        error: isDev
          ? errorMessage
          : "Failed to submit form. Please try again.",
        details: isDev ? errorMessage : undefined,
      },
      { status: 500 },
    );
  }
}
