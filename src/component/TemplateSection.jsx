import { CheckIcon, DocumentTextIcon } from "./Icons";
import Navbar from "./Navbar";
import FooterPart from "./FooterPart";
import { Link } from "react-router-dom";
import { Button, form } from "@heroui/react";
import TemplatePreviewModal from "./TemplatePreview";
import { downloadTemplatePdf } from "../utils/dowloadTemplatePdf";
import { useState } from "react";
import Templates from "./../../template.json";
import useStatus from "./userStatus";
import { useForm } from "../FormDataContext.jsx";
// ...same imports
export default function TCTemplatePage() {
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const templates = Templates.templates;
  const { formData } = useForm();

  const handlePreview = (template) => {
    setPreviewTemplate(template);
  };

  const { userStatus } = useStatus();

  return (
    <>
      <Navbar />
      {/* Floating gradient elements */}
      <div className="fixed -top-20 -left-20 w-64 h-64 rounded-full bg-[#2962ea]/20 blur-3xl -z-0"></div>
      <div className="fixed -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#2962ea]/10 blur-3xl -z-0"></div>
      <div className="bg-[#181e2b] min-h-screen px-4 py-8 sm:px-6 md:px-8 lg:px-12">
        {/* Header */}
        <header className="bg-[#232b38] rounded-lg p-6 mb-10 max-w-7xl mx-auto">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#e4e6e8]">
            Ecommerce TC Generator
          </h1>
          <p className="text-sm text-[#828a96] mt-1">
            Select a template to get started
          </p>
        </header>

        {/* Templates Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.slice(0, 1).map((template, index) => (
            <div
              key={index}
              className="bg-[#374151] border border-[#4c5562] rounded-lg p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-start mb-4">
                <DocumentTextIcon className="h-6 w-6 text-[#2962ea] mr-3 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-[#e4e6e8]">
                    {template.templateName}
                  </h3>
                  <p className="text-sm text-[#828a96] mt-1">
                    {template.clauses.length - 9}. Free pre-built clauses
                  </p>
                </div>
              </div>

              <div className="bg-[#1F2937] rounded p-4 mb-4">
                <h4 className="text-sm font-medium text-[#e4e6e8] mb-2">
                  Includes:
                </h4>
                <ul className="space-y-2">
                  {template.clauses.slice(0, 3).map((clause, i) => (
                    <li key={i} className="flex items-start">
                      <CheckIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm text-[#e4e6e8]">
                        {clause.title.length > 0 ? clause.title : "Untitled"}
                      </span>
                    </li>
                  ))}
                  {template.clauses.length >= 3 && (
                    <li className="text-sm text-[#828a96]">
                      + {template.clauses.length - 3} more clauses
                    </li>
                  )}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
                <Button
                  onPress={() => handlePreview(template)}
                  className="bg-[#4c5562] text-[#e4e6e8] py-2 px-4 rounded-md text-sm hover:opacity-90"
                >
                  Preview
                </Button>
                <Button
                  disabled={!userStatus?.isPaidUser}
                  onPress={() => downloadTemplatePdf(template, formData)}
                  className="bg-[#2962ea] text-[#e4e6e8] py-2 px-4 rounded-md text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {userStatus?.isPaidUser
                    ? "Download anytime"
                    : "Upgrade to Download"}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* --- New Section: Benefits CTA --- */}
        <div className="bg-[#232b38] rounded-lg p-8 mt-16 max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#e4e6e8] mb-4">
            Why Choose Our Generator?
          </h2>
          <p className="text-[#828a96] max-w-xl mx-auto mb-6 text-sm">
            No legal headaches, no confusing language — just simple, fast, and
            compliant T&Cs for your business.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/features">
              <button className="bg-[#2962ea] text-white px-6 py-3 rounded-md hover:opacity-90">
                See Features
              </button>
            </Link>
            <Link to="/pricing">
              <button className="border border-[#4c5562] text-[#e4e6e8] px-6 py-3 rounded-md hover:bg-[#2a3140]">
                View Pricing
              </button>
            </Link>
          </div>
        </div>

        {/* --- New Section: Testimonial --- */}
        <div className="bg-[#1F2937] rounded-lg p-8 mt-16 max-w-3xl mx-auto text-center">
          <p className="text-[#e4e6e8] italic text-lg">
            “I built compliant terms for my online store in under 2 minutes.
            This tool is a game changer for startups.”
          </p>
          <p className="text-[#828a96] mt-4 text-sm">
            — Alex R., Founder @ ShopHub
          </p>
        </div>

        {/* --- Existing Pro CTA --- */}
        <div className="bg-[#242d39] rounded-lg p-6 mt-16 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-[#e4e6e8]">
                Need more power?
              </h3>
              <p className="text-sm text-[#828a96] mt-1">
                Unlock bulk generation, custom branding, and priority support.
              </p>
            </div>
            <Link to="/pricing">
              <button className="bg-[#2962ea] text-[#e4e6e8] py-2 px-6 rounded-md font-medium hover:opacity-90">
                Upgrade to Pro
              </button>
            </Link>
          </div>
        </div>
      </div>
      <TemplatePreviewModal
        template={previewTemplate}
        onClose={() => setPreviewTemplate(null)}
      />
      <FooterPart />
    </>
  );
}
