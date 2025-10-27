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
                By using <strong>Bolt Terms</strong>, you agree to these Terms
                of Service. If you do not agree, please do not use our service.
              </p>
            </Section>

            <Section title="2. User Accounts">
              <p>
                You must provide a valid email address to register. You are
                responsible for maintaining the confidentiality of your account
                and all activity under it.
              </p>
            </Section>

            <Section title="3. Use of the Service">
              <p>
                You may use <strong>Bolt Terms</strong> only for lawful
                purposes. Generated content is your responsibility and must
                comply with applicable laws.
              </p>
            </Section>

            <Section title="4. Intellectual Property">
              <p>
                All content, branding, and software on{" "}
                <strong>Bolt Terms</strong> are the property of Bolt Terms and
                protected by copyright and intellectual property laws.
              </p>
            </Section>

            <Section title="5. Termination">
              <p>
                We reserve the right to suspend or terminate your access at our
                discretion, especially in cases of misuse or violation of these
                Terms.
              </p>
            </Section>

            <Section title="6. Limitation of Liability">
              <p>
                Bolt Terms is not liable for any indirect, incidental, or
                consequential damages arising from the use or inability to use
                our service, even if we have been advised of such possibilities.
              </p>
            </Section>

            <Section title="7. Refund Policy">
              <p>
                In accordance with Paddle’s Buyer Terms, Bolt Terms offers a{" "}
                <strong>14-day refund policy</strong> from the date of purchase.
                If you are not satisfied or encounter technical issues, you may
                request a refund within 14 days by contacting our support team.
              </p>
            </Section>

            <Section title="8. Changes to Terms">
              <p>
                We may update these Terms from time to time. Continued use of
                Bolt Terms after updates constitutes acceptance of the revised
                Terms.
              </p>
            </Section>

            <div className="pt-4 border-t border-[#4c5562]">
              <p className="text-[#828a96] text-sm">
                Questions? Contact us at:{" "}
                <span className="text-[#2962ea]">support@boltterms.com</span>
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
