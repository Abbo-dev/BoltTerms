/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";
import { useForm } from "../FormDataContext.jsx";
import { downloadTemplatePdf } from "../utils/dowloadTemplatePdf";
import { downloadTemplateDocx } from "../utils/downloadTemplateDocx";
import Templates from "./../../template.json";
import FooterPart from "./FooterPart";
import { useGeneratedTemplates } from "./GeneratedTemplatesContext.jsx";
import { CheckIcon, DocumentTextIcon } from "./Icons";
import Navbar from "./Navbar";
import TemplatePreviewModal from "./TemplatePreview";
import useStatus from "./userStatus";

export default function TCTemplatePage() {
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const [usedFreeDownload, setUsedFreeDownload] = useState(() => {
    const used = localStorage.getItem("usedFreeDownload");
    return used ? JSON.parse(used) : false;
  });

  const { generatedTemplates, clearGeneratedTemplates, deleteGeneratedTemplate } =
    useGeneratedTemplates();

  const { formData } = useForm();
  const { user } = useAuth();
  const { userStatus } = useStatus();

  const handleDownload = (template, type) => {
    if (!usedFreeDownload) {
      setUsedFreeDownload(true);
      localStorage.setItem("usedFreeDownload", "true");
      if (type === "pdf") {
        downloadTemplatePdf(template, formData);
      } else {
        downloadTemplateDocx(template, formData);
      }
    }
  };

  useEffect(() => {
    if (user === null) {
      clearGeneratedTemplates();
    }
  }, [user, clearGeneratedTemplates]);

  const templates = user
    ? generatedTemplates.length > 0
      ? generatedTemplates
      : Templates.templates
    : [];

  const showDefaultTemplates = !user || generatedTemplates.length === 0;

  const handlePreview = (template) => {
    setPreviewTemplate(template);
  };

  const buttonVariants = {
    hover: { scale: 1.05, opacity: 0.9 },
    tap: { scale: 0.95 },
  };
  const actionButtonClass = "h-10 text-sm flex-1";

  return (
    <>
      <Navbar />
      {/* Floating gradient elements */}
      <div className="fixed -top-20 -left-20 w-64 h-64 rounded-full bg-[#2962ea]/20 blur-3xl -z-0"></div>
      <div className="fixed -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#2962ea]/10 blur-3xl -z-0"></div>
      <div className="bg-[#181e2b] min-h-screen px-4 py-8 sm:px-6 md:px-8 lg:px-12">
        {/* Header */}
        <header className="bg-[#232b38] rounded-lg p-6 mb-10 max-w-7xl mx-auto mt-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#e4e6e8]">
            Terms & Conditions Templates
          </h1>

          {generatedTemplates.length > 0 ? (
            <>
              <p className="text-sm text-[#828a96] mt-1">
                Your generated templates
              </p>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={clearGeneratedTemplates}
                className="btn-muted mt-4 py-2 px-4 text-sm"
              >
                Clear Generated Templates
              </motion.button>
            </>
          ) : (
            <p className="text-sm text-[#828a96] mt-1">
              Create your first template by using the generator
            </p>
          )}
        </header>

        {!user ? (
          <div className="text-center py-12">
            <h2 className="text-xl text-[#e4e6e8] mb-4">
              Sign In to View Templates
            </h2>
            <p className="text-[#828a96] mb-8">
              Please sign in to view and generate templates
            </p>
            <Link to="/login">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="btn-primary py-2 px-6 text-sm"
              >
                Sign In
              </motion.button>
            </Link>
          </div>
        ) : showDefaultTemplates ? (
          <div className="text-center py-12">
            <h2 className="text-xl text-[#e4e6e8] mb-4">
              No Generated Templates Yet
            </h2>
            <p className="text-[#828a96] mb-8">
              Head over to the generator to create your first template!
            </p>
            <Link to="/generate">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="btn-primary py-2 px-6 text-sm"
              >
                Create Your First Template
              </motion.button>
            </Link>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {templates.map((template, index) => (
              <div
                key={index}
                className="bg-[#374151] border border-[#4c5562] rounded-lg p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-3 mb-4">
                  <DocumentTextIcon className="h-6 w-6 text-[#2962ea] mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#e4e6e8]">
                      {template.templateName}
                    </h3>

                    {template.businessName && (
                      <p className="text-sm text-[#828a96] mt-1">
                        Generated for: {template.businessName}
                      </p>
                    )}
                    {template.dateGenerated && (
                      <p className="text-sm text-[#828a96] mt-1">
                        Generated on:{" "}
                        {new Date(template.dateGenerated).toLocaleDateString()}
                      </p>
                    )}
                    <p className="text-sm text-[#828a96] mt-1">
                      {template.clauses?.length ?? 0} clauses included
                    </p>
                  </div>
                  {template.id && (
                    <motion.button
                      type="button"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => deleteGeneratedTemplate(template.id)}
                      className="btn-danger h-8 px-3 text-xs"
                    >
                      Delete
                    </motion.button>
                  )}
                </div>

                <div className="bg-[#1F2937] rounded p-4 mb-4">
                  <h4 className="text-sm font-medium text-[#e4e6e8] mb-2">
                    Includes:
                  </h4>
                  <ul className="space-y-2">
                    {template.clauses?.slice(0, 3).map((clause, i) => (
                      <li key={i} className="flex items-start">
                        <CheckIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm text-[#e4e6e8]">
                          {clause.title.length > 0 ? clause.title : "Untitled"}
                        </span>
                      </li>
                    ))}
                    {template.clauses?.length >= 3 && (
                      <li className="text-sm text-[#828a96]">
                        + {template.clauses.length - 3} more clauses
                      </li>
                    )}
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex flex-col md:flex-row gap-2">
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => handlePreview(template)}
                      className={`btn-muted ${actionButtonClass}`}
                    >
                      Preview
                    </motion.button>
                    {userStatus?.isPaidUser ? (
                      <div className="flex flex-col md:flex-row gap-2 flex-[2]">
                        <motion.button
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                          onClick={() =>
                            downloadTemplatePdf(template, formData)
                          }
                          className={`btn-primary ${actionButtonClass}`}
                        >
                          Download PDF
                        </motion.button>
                        <motion.button
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                          onClick={() =>
                            downloadTemplateDocx(template, formData)
                          }
                          className={`btn-primary ${actionButtonClass}`}
                        >
                          Download DOCX
                        </motion.button>
                      </div>
                    ) : !usedFreeDownload ? (
                      <div className="flex flex-col md:flex-row gap-2 flex-[2]">
                        <motion.button
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                          onClick={() => handleDownload(template, "pdf")}
                          className={`btn-primary ${actionButtonClass}`}
                        >
                          Try PDF (Free)
                        </motion.button>
                        <motion.button
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                          onClick={() => handleDownload(template, "docx")}
                          className={`btn-primary ${actionButtonClass}`}
                        >
                          Try DOCX (Free)
                        </motion.button>
                      </div>
                    ) : (
                      <Link to="/pricing" className="flex-1">
                        <motion.button
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                          className={`btn-primary ${actionButtonClass} w-full`}
                        >
                          Upgrade for Unlimited Downloads
                        </motion.button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Benefits CTA */}
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
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="btn-primary px-6 py-3"
              >
                See Features
              </motion.button>
            </Link>
            <Link to="/pricing">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="btn-outline-muted px-6 py-3"
              >
                View Pricing
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Pro CTA */}
        <div className="bg-[#242d39] rounded-lg p-6 mt-16 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-[#e4e6e8]">
                Need more power?
              </h3>
              <p className="text-sm text-[#828a96] mt-1">
                Upgrade to Pro for unlimited downloads, extra templates, and
                more advanced features.
              </p>
            </div>
            <Link to="/pricing">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="btn-primary py-2 px-6 text-sm"
              >
                Upgrade to Pro
              </motion.button>
            </Link>
          </div>
        </div>
      </div>

      <FooterPart />

      {previewTemplate && (
        <TemplatePreviewModal
          template={previewTemplate}
          onClose={() => setPreviewTemplate(null)}
        />
      )}
    </>
  );
}
