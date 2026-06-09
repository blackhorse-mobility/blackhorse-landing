import type { Metadata } from "next";
import LeadsForm from "@/components/LeadsForm";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get in Touch | Blackhorse Mobility",
  description:
    "Share your details and connect with the Blackhorse Mobility team for executive chauffeur services and fleet management solutions.",
  alternates: {
    canonical: `${SITE_URL}/leads`,
  },
};

export default function LeadsPage() {
  return <LeadsForm />;
}
