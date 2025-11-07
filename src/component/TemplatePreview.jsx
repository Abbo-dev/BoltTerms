/* eslint-disable react-hooks/rules-of-hooks */
// TemplatePreviewModal.jsx
import { Button, Card, CardBody } from "@heroui/react";
import { useForm } from "../FormDataContext.jsx";

export default function TemplatePreviewModal({ template, onClose }) {
  if (!template) return null;

  const { formData } = useForm();
  //console.log(formData.businessName);
  console.log(formData);
  console.log(formData.websiteURL);
  const businessName = formData.businessName;
  const websiteURL = formData.websiteURL;

  const replacePlaceholders = (text) => {
    if (!text) return "";
    return text
      ?.replace(
        /{{businessName}}/g,
        businessName.charAt(0).toUpperCase() + businessName.slice(1)
      )
      ?.replace(/{{websiteUrl}}/g, websiteURL);
  };
  const cleanedClauses = template.clauses.map((clause) => ({
    ...clause,
    title: clause.title || `Clause ${i++}`, // Add a default title if not provided in the input
    text: replacePlaceholders(clause.text),
  }));

  return (
    <div id="preview-modal">
      <Card className="fixed inset-0 z-100 bg-black bg-opacity-60 flex justify-center items-center px-4 ">
        <CardBody className="bg-[#1f2937] rounded-l-xl rounded-r-xl p-6 max-w-2xl w-full shadow-xl relative overflow-y-auto max-h-[90vh] m-4 ">
          <Button
            onPress={onClose}
            className="  bg-transparent border-none p-0 absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
          >
            ×
          </Button>
          <h2 className="text-xl font-bold text-[#e4e6e8] mb-4">
            {template.templateName}
          </h2>
          <div className="space-y-5">
            {template.generatedContent ? (
              <div className="text-sm text-[#cbd5e1] whitespace-pre-line">
                {template.generatedContent}
              </div>
            ) : (
              cleanedClauses.map((clause, i) => (
                <div key={i}>
                  <h3 className="text-[#e4e6e8] font-semibold mb-1 text-base">
                    {clause.title || `Clause ${i++}`}
                  </h3>
                  <p className="text-sm text-[#cbd5e1] whitespace-pre-line">
                    {replacePlaceholders(clause.text)}
                  </p>
                </div>
              ))
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
