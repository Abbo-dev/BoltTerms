import BackToHome from "./BackHome";
export const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#181e2b] text-[#e4e6e8] py-8 px-4">
      <div className="max-w-3xl mx-auto bg-[#374151] rounded-xl p-6 md:p-8 mt-10">
        <BackToHome />
        {/* Header */}
        <div className="border-b border-[#4c5562] pb-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Privacy Policy</h1>
          <p className="text-[#828a96] mt-2">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6 text-sm md:text-base">
          <Section title="1. Introduction">
            <p>
              TC Gen ("we," "our," or "us") respects your privacy. This policy
              explains how we handle information in our term generator
              application.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <ul className="list-disc pl-5 space-y-2">
              <li>Email address (for account creation)</li>
              <li>Generated terms (stored locally on your device)</li>
              <li>Basic usage analytics (app performance data)</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Data">
            <p>
              We use your email solely for account management. Generated terms
              are processed locally and not shared externally unless you
              explicitly export them.
            </p>
          </Section>

          <Section title="4. Data Security">
            <p>
              We implement industry-standard measures to protect your
              information, including encryption and secure servers.
            </p>
          </Section>

          <Section title="5. Third-Party Services">
            <p>
              We use Firebase for authentication and analytics. These services
              have their own privacy policies which we recommend reviewing.
            </p>
          </Section>

          <Section title="6. Your Rights">
            <p>
              You may request deletion of your account and associated data at
              any time by contacting us at privacy@tcgen.app.
            </p>
          </Section>

          <Section title="7. Changes to This Policy">
            <p>
              We may update this policy periodically. Continued use of TC Gen
              after changes constitutes acceptance of the revised policy.
            </p>
          </Section>

          <div className="pt-4 border-t border-[#4c5562]">
            <p className="text-[#828a96] text-sm">
              For questions about this policy, contact us at: <br />
              <span className="text-[#2962ea]">support@tcgen.app</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable section component
export const Section = ({ title, children }) => (
  <section className="space-y-2">
    <h2 className="text-base md:text-sm font-bold text-[#e4e6e8]">{title}</h2>
    <div className="text-[#e4e6e8]/90">{children}</div>
  </section>
);

export default PrivacyPolicy;
