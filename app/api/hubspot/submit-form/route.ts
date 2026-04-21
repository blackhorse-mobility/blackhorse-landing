import { NextRequest, NextResponse } from "next/server";

const HUBSPOT_API_KEY = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
const HUBSPOT_PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  location?:string;
  industry?: string;
  registrationType: "fleet" | "corporate";
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
    if (data.registrationType) properties.registration_type = data.registrationType;

    
    const today = new Date().toISOString().split('T')[0];
    properties.registration_date = today;
    properties.source = "blackhorse_landing";

    console.log("Submitting to HubSpot with properties:", properties);

    const response = await fetch(
      "https://api.hubapi.com/crm/v3/objects/contacts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HUBSPOT_API_KEY}`,
        },
        body: JSON.stringify({ properties }),
      }
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
      // console.error("HUBSPOT_PRIVATE_APP_TOKEN is not configured");
      return NextResponse.json(
        { error: "HubSpot configuration missing. Please contact support." },
        { status: 500 }
      );
    }

    let data: FormData;
    try {
      data = await request.json();
    } catch (error) {
      // console.error("Invalid JSON in request:", error);
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }

    
    if (!data.email || !data.firstName || !data.lastName || !data.company) {
      return NextResponse.json(
        { error: "Missing required fields: firstName, lastName, email, company" },
        { status: 400 }
      );
    }

    
    const result = await submitToHubSpot(data);

    return NextResponse.json(
      {
        success: true,
        message: "Contact submitted to HubSpot successfully",
        contactId: result.id,
      },
      { status: 200 }
    );
  } catch (error) {
    const isDev = process.env.NODE_ENV !== "production";
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    // console.error("Form submission error:", errorMessage);
    
    return NextResponse.json(
      {
        error: isDev 
          ? errorMessage 
          : "Failed to submit form. Please try again.",
        details: isDev ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}
