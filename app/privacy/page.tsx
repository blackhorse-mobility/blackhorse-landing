import LegalLayout from "@/components/LegalLayout";

export default function PrivacyPage() {
  return (
    <LegalLayout activeId="privacy">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
          Privacy Policy
        </h1>
        <div className="flex items-center gap-2 mb-8 border-b border-gray-100 pb-8">
          <span className="inline-flex items-center rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
            Last updated: October 24, 2026
          </span>
        </div>
        <p className="text-gray-600 text-[17px] max-w-3xl leading-relaxed">
          Your privacy is critically important to us. This policy outlines how Blackhorse collects, uses, and protects your data to ensure transparency and trust in everything we do.
        </p>
      </div>

      <div className="space-y-12 text-gray-600 text-[16px] leading-[1.8]">
        <section>
          <h2 className="text-2xl font-medium text-black mb-5">1. Information We Collect</h2>
          <p className="mb-4">
            We collect information that you provide directly to us when you register for an account, book a ride, or communicate with our support team.
          </p>
          <p>
            This includes personal identification information (Name, email address, phone number), payment and billing information, and corporate affiliation details necessary for setting up business profiles on our platform.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-medium text-black mb-5">2. Automatically Collected Information</h2>
          <p>
            When you access or use our services, we automatically collect information about you, including log information, device information, and location data (with your consent) required to facilitate fleet movements and real-time tracking.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-medium text-black mb-5">3. How We Use Your Information</h2>
          <p className="mb-4">
            The information we collect is used to facilitate our corporate fleet and transportation services, process transactions, and improve our unified platform. Specifically, we use your information to:
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-700">
            <li>Provide, maintain, and improve our services.</li>
            <li>Process transactions and send related information, including confirmations and receipts.</li>
            <li>Verify identity and prevent fraud or unauthorized activity.</li>
            <li>Communicate with you about products, services, offers, and events offered by Blackhorse.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-black mb-5">4. Data Sharing and Security</h2>
          <p className="mb-4">
            Blackhorse employs rigorous security protocols to protect your personal and corporate data against unauthorized access or breaches. We deploy industry-standard encryption and follow strict compliance requirements.
          </p>
          <p>
            We do not sell your personal data. We may share information with integrated fleet partners solely for the purpose of executing rides, or with trusted service providers who adhere to our strict data processing agreements.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-black mb-5">5. Data Retention & Your Rights</h2>
          <p className="mb-4">
            We retain your information for as long as your account is active or as needed to provide you services and comply with legal obligations.
          </p>
          <p>
            You possess the right to access, update, or delete your personal data. Corporate users may also have their account administrators manage their data via the Blackhorse Dashboard. If you wish to exercise these rights, please contact our privacy compliance team.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-medium text-black mb-5">6. Policy Updates</h2>
          <p>
            We may revise this privacy policy from time to time. The most current version will always be posted gracefully on this page. If a revision meaningfully reduces your rights, we will notify you in advance via email or platform notifications.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
