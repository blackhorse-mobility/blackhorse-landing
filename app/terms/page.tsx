import LegalLayout from "@/components/LegalLayout";

export default function TermsPage() {
  return (
    <LegalLayout activeId="terms">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
          Terms of Service
        </h1>
        <div className="flex items-center gap-2 mb-8 border-b border-gray-100 pb-8">
          <span className="inline-flex items-center rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
            Last updated: October 24, 2026
          </span>
        </div>
        <p className="text-gray-600 text-[17px] max-w-3xl leading-relaxed">
          These terms govern your use of the Blackhorse platform. By accessing or using our services, you agree to be bound by these conditions. Please read them carefully.
        </p>
      </div>

      <div className="space-y-12 text-gray-600 text-[16px] leading-[1.8]">
        <section>
          <h2 className="text-2xl font-medium text-black mb-5">1. Acceptance of Terms</h2>
          <p>
            By creating an account, booking a ride, or interacting with the Blackhorse platform in any capacity, you acknowledge that you have read, understood, and unreservedly agreed to these Terms of Service.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-medium text-black mb-5">2. Service Scope and Usage</h2>
          <p className="mb-4">
            Our platform aggregates corporate fleet demand and supply. We provide a technologically driven ecosystem where corporate entities can book premium transportation and fleet partners can manage active operations.
          </p>
          <p>
            Users must interact with the platform reasonably, ensuring all provided information is accurate, and adhere strictly to all corporate partner guidelines during transportation. Abusive behavior, fraudulent bookings, or exploitation of the service is strictly prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-black mb-5">3. Payments, Billing, and Corporate Accounts</h2>
          <p className="mb-4">
            Access to our fleet and corporate integrations requires an active billing agreement. For corporate accounts, monthly invoicing depends on executed contracts. By providing a payment method, you grant Blackhorse authorization to charge for all services rendered.
          </p>
          <p>
            Discrepancies in billing must be reported to support within 14 days of the invoice date. Late payments may result in the suspension of corporate dashboard access.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-black mb-5">4. Partner Obligations and Liabilities</h2>
          <p className="mb-4">
            Fleet and transport partners operate under specific, independent Service Level Agreements (SLAs) in tandem with these general terms. Partners are solely responsible for vehicle maintenance, insurance coverage, and compliance with local transit regulations.
          </p>
          <p>
            Blackhorse acts as an intermediary technology aggregator. We do not personally operate the fleets, and we disclaim liability for delays, damages, or losses occurring during transit, outside the scope of our SLA guarantees.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-medium text-black mb-5">5. Intellectual Property</h2>
          <p className="mb-4">
            All designs, text, graphics, and underlying software code affiliated with Blackhorse remain our exclusive intellectual property. You may not copy, reverse engineer, or distribute our platform assets without explicit, written consent.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-black mb-5">6. Termination of Services</h2>
          <p>
            We reserve the right to suspend or terminate your account if you violate these terms. In the event of account termination, you remain responsible for paying all outstanding charges incurred prior to termination.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
