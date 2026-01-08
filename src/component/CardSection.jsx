/* eslint-disable no-unused-vars */
import { Card, CardBody } from "@heroui/card";
import {
  Button,
  Image,
  Input,
  Select,
  SelectItem,
  addToast,
} from "@heroui/react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";
import { useForm } from "../FormDataContext.jsx";
import Templates from "./../../template.json";
import Copy from "./../assets/copy.svg";
import { GeneratedTemplatesContext } from "./GeneratedTemplatesContext.jsx";
// Added framer-motion and heroicons for enhanced styling and animations
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";

function CardSection() {
  const options = [{ value: "E-commerce", label: "E-commerce" }];
  const [businessName, setBusinessName] = useState("");
  const [websiteURL, setWebsiteURL] = useState("");
  const [businessType, setBusinessType] = useState("E-commerce");
  const [generatedContent, setGeneratedContent] = useState("");
  const [count, setCount] = useState(0);
  const { user } = useAuth();
  const { addGeneratedTemplate } = useContext(GeneratedTemplatesContext);
  const [loading, setLoading] = useState(false);
  // State to control the visibility of the post-generation toast
  const [showTemplateToast, setShowTemplateToast] = useState(false);

  const replacePlaceholders = (text) => {
    return text
      .replace(/{{businessName}}/g, businessName)
      .replace(/{{websiteUrl}}/g, websiteURL);
  };

  const { formData, setFormData } = useForm();

  const [selectedTemplate, setSelectedTemplate] = useState(
    Templates.templates[0]
  );

  const handleTemplateSelect = (templateIndex) => {
    const template =
      Templates.templates[templateIndex] || Templates.templates[0];
    setSelectedTemplate(template);
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      if (!user && count >= 2) {
        setGeneratedContent(
          "You need to be a paid user to generate more T&Cs."
        );
        addToast({
          description: "You need to be a paid user to generate more T&Cs.",
          duration: 5000,
          color: "danger",
          position: "top-right",
          classNames: {
            description: "text-red-500",
            closeButton:
              "opacity-100 absolute right-4 top-1/2 -translate-y-1/2 ",
          },
          closeIcon: (
            <svg
              fill="none"
              height="32"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="32"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          ),
        });
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call

      setCount((prev) => prev + 1);
      const newFormData = {
        ...formData,
        businessName,
        websiteURL,
        businessType,
      };
      setFormData(newFormData);

      const content = selectedTemplate.clauses
        .map((clause, idx) => {
          const replacedText = replacePlaceholders(clause.text || "");
          return `${idx + 1}. ${clause.title || "Untitled"}\n${replacedText}`;
        })
        .join("\n\n");

      setGeneratedContent(content);

      const generatedTemplate = {
        ...selectedTemplate,
        generatedContent: content,
        businessName,
        websiteURL,
        businessType,
        dateGenerated: new Date().toISOString(),
      };
      addGeneratedTemplate(generatedTemplate);

      // Show the custom toast on successful generation
      setShowTemplateToast(true);
    } catch (error) {
      void error;
    } finally {
      setLoading(false);
    }
  };

  // Automatically hide the toast after a delay
  useEffect(() => {
    if (showTemplateToast) {
      const timer = setTimeout(() => {
        setShowTemplateToast(false);
      }, 8000); // Stays for 8 seconds
      return () => clearTimeout(timer);
    }
  }, [showTemplateToast]);

  const handleCopy = () => {
    if (generatedContent && !loading) {
      navigator.clipboard.writeText(generatedContent);
      addToast({
        description: "Text copied to clipboard",
        duration: 3000,
        position: "top-right",
        classNames: {
          description: "text-[#e4e6e8]",
          base: "bg-[#242d39] border border-white/10 p-5",
          closeButton: "opacity-100 absolute right-4 top-1/2 -translate-y-1/2 ",
        },
        closeIcon: (
          <svg
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        ),
      });
    }
  };

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };
  const inputClassNames = {
    inputWrapper:
      "bg-[#1f2937]/60 border border-[#3a4556] data-[hover=true]:bg-[#1f2937]/80 data-[focus=true]:border-[#2962ea]",
    input: "text-[#e4e6e8] placeholder:text-[#9CA3AF]",
    label: "text-[#9CA3AF]",
  };
  const selectClassNames = {
    trigger:
      "bg-[#1f2937]/60 border border-[#3a4556] text-[#e4e6e8] data-[hover=true]:bg-[#1f2937]/80",
    value: "text-[#e4e6e8]",
    selectorIcon: "text-[#9CA3AF]",
    popoverContent:
      "bg-[#1f2937] border border-[#3a4556] text-[#e4e6e8] backdrop-blur-none",
    listboxWrapper: "bg-[#1f2937] backdrop-blur-none",
    listbox: "text-[#e4e6e8]",
    label: "text-[#9CA3AF]",
  };

  return (
    <>
      <div className="w-full flex justify-center px-4 transition-all">
        <Card className="w-full max-w-[1300px] bg-[#242d39]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl shadow-black/20 transition-all ">
          <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Left Side - Form */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h1 className="text-white text-2xl font-bold mb-6 text-left">
                Document Details
              </h1>
              <div className="flex flex-col space-y-10 transition-all">
                <motion.div variants={itemVariants}>
                  <Input
                    type="text"
                    label="Business Name"
                    labelPlacement="inside"
                    size="sm"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    classNames={inputClassNames}
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Input
                    type="text"
                    label="Website URL"
                    labelPlacement="inside"
                    size="sm"
                    value={websiteURL}
                    onChange={(e) => setWebsiteURL(e.target.value)}
                    classNames={inputClassNames}
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Select
                    label="Select Business Type"
                    className="pt-2"
                    labelPlacement="inside"
                    size="sm"
                    onChange={(e) => setBusinessType(e.target.value)}
                    isRequired
                    classNames={selectClassNames}
                  >
                    {options.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="text-[#e4e6e8] hover:bg-[#2a3442]"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </Select>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Select
                    label="Select Template "
                    className="pt-2"
                    labelPlacement="inside"
                    size="sm"
                    onChange={(e) =>
                      handleTemplateSelect(Number(e.target.value))
                    }
                    isRequired
                    classNames={selectClassNames}
                  >
                    {Templates.templates.map((template, index) => (
                      <SelectItem
                        key={index}
                        value={index}
                        className="text-[#e4e6e8] hover:bg-[#2a3442]"
                      >
                        {template.templateName}
                      </SelectItem>
                    ))}
                  </Select>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Button
                    isLoading={loading}
                    disabled={!businessName || !websiteURL || loading}
                    onPress={handleGenerate}
                    className="btn-primary w-full h-12 text-base hover:shadow-lg hover:shadow-[#2962ea]/20"
                  >
                    {loading ? "Generating..." : "Generate T&C"}
                  </Button>
                  <p className="text-[#9CA3AF] text-[9px] text-center mt-3">
                    By generating, you acknowledge this is AI-assisted and not a
                    substitute for legal counsel.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Preview */}
            <motion.div
              className="w-full rounded-xl bg-[#181e2b]/50 border border-white/10 h-[600px] flex flex-col"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10 shrink-0">
                <h1 className="text-white text-lg font-semibold">
                  Document Preview
                </h1>
                <Button
                  onPress={handleCopy}
                  className="btn-muted h-10 flex items-center justify-center gap-2"
                >
                  <Image src={Copy} className="w-5 h-5" />
                  <span className="text-sm">Copy</span>
                </Button>
              </div>
              <div className="p-4 overflow-auto h-full">
                <h2 className="text-xl text-white font-bold mb-4">
                  Terms & Conditions
                </h2>
                <pre className="text-gray-400 text-sm whitespace-pre-wrap font-sans">
                  {loading ? (
                    <div className="animate-pulse space-y-2">
                      <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-600 rounded w-full"></div>
                      <div className="h-4 bg-gray-600 rounded w-5/6"></div>
                    </div>
                  ) : (
                    generatedContent ||
                    "Fill out the form to generate your T&C."
                  )}
                </pre>
              </div>
            </motion.div>
          </CardBody>
        </Card>
      </div>

      {/* Post-Generation Custom Toast */}
      <AnimatePresence>
        {showTemplateToast && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-5 left-1/2 -translate-x-1/2 w-full max-w-lg z-50"
          >
            <div className="bg-[#242d39] border border-white/10 rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-4">
              <CheckCircleIcon className="w-6 h-6 text-green-400 shrink-0" />
              <div className="flex-grow">
                <p className="font-semibold text-white">Document Generated!</p>
                <p className="text-sm text-gray-400">
                  You can also browse your generated templates.
                </p>
              </div>
              <Link
                to="/templates"
                onClick={() => setShowTemplateToast(false)}
                className="btn-primary px-4 py-2 text-sm whitespace-nowrap"
              >
                Browse
              </Link>
              <Button
                isIconOnly
                className="btn-ghost shrink-0"
                onPress={() => setShowTemplateToast(false)}
              >
                <XMarkIcon className="w-5 h-5 text-gray-400" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default CardSection;
