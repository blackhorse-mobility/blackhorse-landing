import { NextRequest, NextResponse } from "next/server";

const HUBSPOT_API_KEY = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
const HUBSPOT_PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  registrationType: "fleet" | "corporate";
}

async function submitToHubSpot(data: FormData) {
  if (!HUBSPOT_API_KEY) {
    throw new Error("Missing HUBSPOT_PRIVATE_APP_TOKEN");
  }

  try {
    const response = await fetch(
      "https://api.hubapi.com/crm/v3/objects/contacts/upsert",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HUBSPOT_API_KEY}`,
        },
        body: JSON.stringify({
          inputs: [
            {
              idProperty: "email",
              id: data.email,
              properties: {
                firstname: data.firstName,
                lastname: data.lastName,
                email: data.email,
                phone: data.phone,
                company: data.company,
                industry: data.industry,
                lifecyclestage: "lead",
                hs_lead_status: "NEW",
                source: "blackhorse_landing",
                registration_type: data.registrationType,
                registration_date: new Date().toISOString(),
              },
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `HubSpot API error: ${error.message || response.statusText}`
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error submitting to HubSpot:", error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    
    if (!HUBSPOT_API_KEY) {
      return NextResponse.json(
        { error: "HubSpot configuration missing" },
        { status: 500 }
      );
    }

    const data: FormData = await request.json();

    
    if (!data.email || !data.firstName || !data.lastName || !data.company) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

   
    const result = await submitToHubSpot(data);

    return NextResponse.json(
      {
        success: true,
        message: "Contact submitted to HubSpot successfully",
        contactId: result.outputs[0]?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to submit form to HubSpot",
      },
      { status: 500 }
    );
  }
}
