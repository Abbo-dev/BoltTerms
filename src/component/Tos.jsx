import { Section } from "./PolicyPage";
import BackToHome from "./BackHome";
const TermsOfService = () => {
  return (
    <>
      <div className="min-h-screen bg-[#181e2b] text-[#e4e6e8] py-8 px-4 ">
        <div className="max-w-3xl mx-auto bg-[#374151] rounded-xl p-6 mt-10 md:p-8">
          <div className="border-b border-[#4c5562] pb-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Terms of Service</h1>
            <p className="text-[#828a96] mt-2">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-6 text-sm md:text-base">
            <Section title="1. Acceptance of Terms">
              <p>
                By using TC Gen, you agree to these Terms of Service. If you do
                not agree, do not use our service.
              </p>
            </Section>

            <Section title="2. User Accounts">
              <p>
                You must provide a valid email address to register. You are
                responsible for maintaining the confidentiality of your account.
              </p>
            </Section>

            <Section title="3. Use of the Service">
              <p>
                You may use TC Gen only for lawful purposes. Generated content
                is your responsibility and must comply with applicable laws.
              </p>
            </Section>

            <Section title="4. Intellectual Property">
              <p>
                All content, branding, and software on TC Gen are the property
                of TC Gen and protected by copyright and other laws.
              </p>
            </Section>

            <Section title="5. Termination">
              <p>
                We reserve the right to suspend or terminate your access at our
                discretion, especially in cases of abuse or misuse.
              </p>
            </Section>

            <Section title="6. Limitation of Liability">
              <p>
                We are not liable for damages resulting from the use or
                inability to use our service, even if we’ve been advised of the
                possibility.
              </p>
            </Section>

            <Section title="7. Changes to Terms">
              <p>
                We may update these Terms at any time. Continued use after
                changes constitutes acceptance.
              </p>
            </Section>

            <div className="pt-4 border-t border-[#4c5562]">
              <p className="text-[#828a96] text-sm">
                Questions? Contact us at:{" "}
                <span className="text-[#2962ea]">support@tcgen.app</span>
              </p>
            </div>
          </div>
        </div>
        <BackToHome />
      </div>
    </>
  );
};
export default TermsOfService;
