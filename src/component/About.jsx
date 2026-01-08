import { Section } from "./PolicyPage";
const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#181e2b] text-[#e4e6e8] py-8 px-4">
      <div className="max-w-3xl mx-auto bg-[#374151] rounded-xl p-6 md:p-8">
        {/* Header */}
        <div className="border-b border-[#4c5562] pb-4 mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold">About Bolt Terms</h1>
          <p className="text-[#828a96] mt-2">
            Simple, compliant Terms & Conditions generation
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6 text-sm md:text-base">
          <Section title="What is Bolt Terms?">
            <p>
              Bolt Terms is a streamlined tool that helps you generate clear,
              professional Terms & Conditions for your business in minutes. It
              is built for founders who want speed, clarity, and compliance
              without the legal hassle.
            </p>
          </Section>

          <Section title="Our Mission">
            <p>
              To make legal compliance simple and accessible for every
              business—so you can launch faster and stay protected.
            </p>
          </Section>

          <Section title="Key Features">
            <ul className="list-disc pl-5 space-y-2">
              <li>Instant Terms & Conditions generation</li>
              <li>Industry-specific templates</li>
              <li>PDF and DOCX export</li>
              <li>Secure account-based storage</li>
            </ul>
          </Section>

          <Section title="The Team">
            <p>
              Bolt Terms is built by a small team of builders and legal-tech
              enthusiasts focused on helping founders ship confidently.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Have questions or suggestions? We'd love to hear from you.
              <br />
              <a
                href="mailto:support@boltterms.com"
                className="text-[#2962ea] hover:underline"
              >
                support@boltterms.com
              </a>
            </p>
          </Section>

          <div className="pt-4 border-t border-[#4c5562] text-[#828a96] text-sm">
            <p>Version 1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
