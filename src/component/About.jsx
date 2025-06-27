import { Section } from "./PolicyPage";
const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#181e2b] text-[#e4e6e8] py-8 px-4">
      <div className="max-w-3xl mx-auto bg-[#374151] rounded-xl p-6 md:p-8">
        {/* Header */}
        <div className="border-b border-[#4c5562] pb-4 mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold">About TC Gen</h1>
          <p className="text-[#828a96] mt-2">
            Simple, powerful term generation
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6 text-sm md:text-base">
          <Section title="What is TC Gen?">
            <p>
              TC Gen is a specialized tool that helps you generate technical
              terms and definitions instantly. Perfect for writers, developers,
              and content creators who need precise terminology.
            </p>
          </Section>

          <Section title="Our Mission">
            <p>
              To eliminate terminology roadblocks by providing quick, accurate
              term generation without compromising on quality or technical
              accuracy.
            </p>
          </Section>

          <Section title="Key Features">
            <ul className="list-disc pl-5 space-y-2">
              <li>Instant technical term generation</li>
              <li>Customizable output complexity</li>
              <li>Save and organize your terms</li>
              <li>100% client-side processing</li>
            </ul>
          </Section>

          <Section title="The Team">
            <p>
              TC Gen is developed by a small team of language technologists and
              developers passionate about making technical writing more
              accessible.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Have questions or suggestions? We'd love to hear from you.
              <br />
              <a
                href="mailto:contact@tcgen.app"
                className="text-[#2962ea] hover:underline"
              >
                contact@tcgen.app
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
