import { Section } from "./PolicyPage";
import BackToHome from "./BackHome";
const CookiesPolicy = () => {
  return (
    <div className="min-h-screen bg-[#181e2b] text-[#e4e6e8] py-8 px-4">
      <div className="max-w-3xl mx-auto bg-[#374151] rounded-xl p-6 md:p-8 mt-10">
        <div className="border-b border-[#4c5562] pb-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Cookies Policy</h1>
          <p className="text-[#828a96] mt-2">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-6 text-sm md:text-md">
          <Section title="1. What Are Cookies?">
            <p>
              Cookies are small text files stored on your device to help improve
              your experience on our site.
            </p>
          </Section>

          <Section title="2. How We Use Cookies">
            <ul className="list-disc pl-5 space-y-2">
              <li>Authentication and session management</li>
              <li>
                Usage analytics to improve our service (e.g., Firebase
                Analytics)
              </li>
              <li>Remembering your preferences</li>
            </ul>
          </Section>

          <Section title="3. Managing Cookies">
            <p>
              You can disable cookies via your browser settings. However, this
              may impact certain features of Bolt Terms.
            </p>
          </Section>

          <Section title="4. Third-Party Cookies">
            <p>
              We may use third-party tools that set cookies (e.g., Paddle,
              Firebase). These are governed by their respective policies.
            </p>
          </Section>

          <div className="pt-4 border-t border-[#4c5562]">
            <p className="text-[#828a96] text-sm">
              For questions about our cookie use, contact:{" "}
              <span className="text-[#2962ea]">privacy@boltterms.com</span>
            </p>
          </div>
        </div>
      </div>
      <BackToHome />
    </div>
  );
};

export default CookiesPolicy;
