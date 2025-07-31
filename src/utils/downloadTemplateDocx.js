import { Document, Paragraph, TextRun, Packer } from "docx";
import { saveAs } from "file-saver";

export const downloadTemplateDocx = async (template, formData) => {
  const replacePlaceholders = (text) => {
    if (!text) return "";
    return text
      ?.replace(/{{businessName}}/g, formData?.businessName || "Your Business")
      ?.replace(/{{websiteUrl}}/g, formData?.websiteURL || "your-website.com");
  };

  // Create a new document
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Title
          new Paragraph({
            children: [
              new TextRun({
                text: template.templateName,
                bold: true,
                size: 32,
              }),
            ],
            spacing: { after: 400 },
          }),

          // Business Info
          new Paragraph({
            children: [
              new TextRun({
                text: `Generated for: ${
                  formData?.businessName || template.businessName
                }`,
                size: 24,
              }),
            ],
            spacing: { after: 400 },
          }),

          // Date
          new Paragraph({
            children: [
              new TextRun({
                text: `Last Updated: ${new Date().toLocaleDateString()}`,
                size: 24,
              }),
            ],
            spacing: { after: 800 },
          }),

          // Clauses
          ...template.clauses.flatMap((clause) => [
            // Clause Title
            new Paragraph({
              children: [
                new TextRun({
                  text: clause.title || "Untitled Clause",
                  bold: true,
                  size: 28,
                }),
              ],
              spacing: { before: 400, after: 200 },
            }),
            // Clause Content
            new Paragraph({
              children: [
                new TextRun({
                  text: replacePlaceholders(clause.text || ""),
                  size: 24,
                }),
              ],
              spacing: { after: 400 },
            }),
          ]),
        ],
      },
    ],
  });

  // Generate and save the document
  const buffer = await Packer.toBlob(doc);
  saveAs(
    buffer,
    `${template.templateName.replace(/\s+/g, "_")}_${
      new Date().toISOString().split("T")[0]
    }.docx`
  );
};
