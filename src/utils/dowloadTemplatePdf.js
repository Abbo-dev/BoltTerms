  import jsPDF from "jspdf";
  import html2canvas from "html2canvas";

  export async function downloadPreviewAsPdf() {
    const element = document.getElementById("preview-modal");
    if (!element) {
      alert("Preview not open!");
      return;
    }
    // Use html2canvas to capture the modal
    const canvas = await html2canvas(element, {
      backgroundColor: "#1f2937", // Match the modal background
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("preview.pdf");
  }

  // Helper function to strip HTML tags and decode entities
  function stripHtmlAndDecode(html) {
    if (!html) return "";

    // Create a temporary div to strip HTML tags
    const temp = document.createElement("div");
    temp.innerHTML = html;

    // Get text content and clean up
    let text = temp.textContent || temp.innerText || "";

    // Decode common HTML entities
    text = text
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    return text.trim();
  }

  export function downloadTemplatePdf(template, formData) {
    const doc = new jsPDF();
    let y = 20;

    // Title
    doc.setFontSize(20);
    doc.setTextColor(40, 98, 234); // #2962ea
    doc.text(template.templateName, 10, y);
    y += 10;

    // Subtitle
    doc.setFontSize(12);
    doc.setTextColor(130, 138, 150); // #828a96
    doc.text(`Generated Terms & Conditions`, 10, y);
    y += 10;

    // Divider
    doc.setDrawColor(76, 85, 98); // #4c5562
    doc.line(10, y, 200, y);
    y += 10;

    // Clauses (full preview)
    template.clauses.forEach((clause, i) => {
      // Check if we need a new page before adding clause title
      if (y > 250) {
        doc.addPage();
        y = 20;
      }

      // Clause Title
      doc.setFontSize(14);
      doc.setTextColor(52, 62, 72);
      doc.setFont(undefined, "bold");
      doc.text(`${i + 1}. ${clause.title || "Untitled"}`, 10, y);
      y += 8;

      // Debug: log the clause content to see what we're working with

      // Clause Content - strip HTML and clean up
      doc.setFont(undefined, "normal");
      doc.setFontSize(16);
      doc.setTextColor(80, 80, 80);

      // Apply the same placeholder replacement as in the modal
      const replacePlaceholders = (text) => {
        if (!text) return "";
        return text
          ?.replace(
            /{{businessName}}/g,
            formData?.businessName || "Your Business"
          )
          ?.replace(
            /{{websiteUrl}}/g,
            formData?.websiteURL || "your-website.com"
          );
      };

      // Get clean text content with placeholders replaced
      const rawText = replacePlaceholders(clause.text || "");
      const cleanContent = stripHtmlAndDecode(rawText || "No content available");

      // Handle empty content
      if (!cleanContent || cleanContent.trim() === "") {
        doc.setTextColor(150, 150, 150);
        doc.text("No content available", 12, y);
        y += 12;
      } else {
        // Split text to fit page width
        const lines = doc.splitTextToSize(cleanContent, 180);

        // Check if content fits on current page
        const contentHeight = lines.length * 5;
        if (y + contentHeight > 280) {
          doc.addPage();
          y = 20;
        }

        doc.text(lines, 12, y);
        y += lines.length * 5 + 12; // Add spacing after each clause
      }
    });

    doc.save(`${template.templateName}.pdf`);
  }
