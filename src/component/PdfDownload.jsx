import React from "react";

function PdfDownload() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center text-[#e4e6e8] mb-4">
        Download Your PDF
      </h1>
      <p className="text-center text-[#828a96] mb-6">
        Click the button below to download your generated PDF document.
      </p>
      <div className="flex justify-center">
        <a
          href="/path/to/your/generated.pdf"
          download
          className="bg-[#2962ea] text-white px-6 py-3 rounded-lg hover:bg-[#1e40af] transition-colors"
        >
          Download PDF
        </a>
      </div>
    </div>
  );
}

export default PdfDownload;
