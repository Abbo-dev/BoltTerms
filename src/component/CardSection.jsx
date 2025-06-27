import { Card, CardBody } from "@heroui/card";
import {
  Input,
  Button,
  Select,
  SelectItem,
  Image,
  addToast,
} from "@heroui/react";
import Copy from "./../assets/copy.svg";
import { useState } from "react";
import Templates from "./../../template.json";
import { useForm } from "../FormDataContext.jsx";

function CardSection() {
  const options = [{ value: "E-commerce", label: "E-commerce" }];
  const [businessName, setBusinessName] = useState("");
  const [websiteURL, setWebsiteURL] = useState("");
  const [businessType, setBusinessType] = useState("E-commerce");
  const [generatedContent, setGeneratedContent] = useState("");

  const replacePlaceholders = (text) => {
    return text
      .replace(/{{businessName}}/g, businessName)
      .replace(/{{websiteUrl}}/g, websiteURL);
  };

  const { formData, setFormData } = useForm();

  const handleGenerate = () => {
    const newFormData = {
      ...formData,
      businessName,
      websiteURL,
      businessType,
    };
    setFormData(newFormData);
    console.log("Generated content:", formData);

    const firstTemplate = Templates.templates[0];
    const content = firstTemplate.clauses
      .map((clause, idx) => {
        const replacedText = replacePlaceholders(clause.text || "");
        return `${idx + 1}. ${clause.title || "Untitled"}\n${replacedText}`;
      })
      .join("\n\n");

    setGeneratedContent(content);
  };

  const handleCopy = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent);
    }
  };

  return (
    <div className="w-full flex justify-center px-4 mt-10 transition-all">
      <Card className="w-full max-w-[1400px] bg-[#242d39] rounded-2xl p-10 shadow-lg transition-all ">
        <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side - Form */}
          <Card className="w-full max-w-lg mx-auto rounded-xl shadow pb-10 bg-[#394251]  overflow-hidden">
            <CardBody className="p-8">
              <div className="flex flex-col gap-8">
                <h1 className="text-white text-lg font-semibold text-left">
                  Document Details
                </h1>
                <Input
                  type="text"
                  label="Business Name"
                  labelPlacement="inside"
                  size="sm"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
                <Input
                  type="text"
                  label="Website URL"
                  labelPlacement="inside"
                  size="sm"
                  value={websiteURL}
                  onChange={(e) => setWebsiteURL(e.target.value)}
                />
                <Select
                  label="Select Business Type"
                  className="pt-2"
                  labelPlacement="inside"
                  size="sm"
                  onChange={(e) => setBusinessType(e.target.value)}
                  isRequired
                >
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </Select>

                <Button
                  disabled={!businessName || !websiteURL}
                  onPress={handleGenerate}
                  className="w-full bg-[#2962ea] text-[#e4e6e8] font-semibold rounded-md  disabled:opacity-50  disabled:cursor-not-allowed"
                >
                  Generate T&C
                </Button>
                <small className="text-[#9CA3AF] text-[7px] font-extralight -mt-7 p">
                  By generating T&Cs, you acknowledge this is AI-assisted and
                  not a substitute for legal counsel.
                </small>
              </div>
            </CardBody>
          </Card>

          {/* Right Side - Preview */}
          <Card className="w-full max-w-lg mx-auto rounded-xl bg-[#394251] border-none shadow-none  h-[450px] ">
            <CardBody className="p-0 overflow-hidden w-full">
              <div className="flex flex-col h-full px-6 pt-6">
                <div className="flex items-center justify-between ">
                  <h1 className="text-white text-lg font-semibold text-left">
                    Document Preview
                  </h1>
                  <Button
                    onPress={() => {
                      handleCopy();
                      addToast({
                        description: "Text copied to clipboard",
                        duration: 500,
                        classNames: {
                          description: "text-[#828a96]",
                          base: "bg-[#242d39] border-none p-5",
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
                    }}
                    className="bg-[#4c5562] text-white font-semibold w-50 h-10 flex items-center justify-center gap-2 rounded-md"
                  >
                    <Image src={Copy} className="w-6 h-6" />
                    <h1 className="text-sm text-white">Copy</h1>
                  </Button>
                </div>
                <Card className=" h-full my-3 bg-[#242d39] border-none shadow-none overflow-auto">
                  <CardBody className="!p-0 !overflow-auto h-full">
                    <div className="p-4 text-gray-300">
                      <h2 className="text-xl font-bold mb-4">
                        Terms & Conditions
                      </h2>
                      <pre className="text-gray-400 text-sm whitespace-pre-wrap">
                        {generatedContent ||
                          "Fill out the form to generate your T&C."}
                      </pre>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </CardBody>
          </Card>
        </CardBody>
      </Card>
    </div>
  );
}

export default CardSection;
