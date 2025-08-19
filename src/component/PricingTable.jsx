import React from "react";

// A small, reusable SVG component for the checkmark icon.
const CheckmarkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-green-400 mx-auto"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

/**
 * PricingTable Component
 * A stylish, self-contained table component for displaying feature comparisons.
 * It uses Tailwind CSS for styling to match the provided design aesthetic.
 */
function PricingTable() {
  // Data for the table rows can be stored in an array of objects for easy mapping.
  const features = [
    { name: "TC generations", value: "Unlimited" },
    { name: "Export formats", value: "PDF + DOCX" },
    { name: "Templates & branding", value: "Included" },
    { name: "Custom fields", value: <CheckmarkIcon /> },
    { name: "Support", value: "Email (48h)" },
  ];

  return (
    // The main container is set to a dark background to showcase the component.
    <div className="bg-[#181e2b] flex items-center justify-center font-sans p-4 mt-5">
      {/* Main container for the pricing table section */}
      <div className="max-w-4xl mx-auto w-full">
        {/* Section Title */}
        <h2 className="text-3xl font-bold mb-8 text-center text-[#e4e6e8]">
          What's Included
        </h2>

        {/* Card container with glassmorphism effect */}
        <div className="bg-[#242d39]/60 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl shadow-black/20 overflow-hidden">
          <div className="overflow-x-auto">
            {/* Styled Table */}
            <table className="w-full text-[#e4e6e8] min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10">
                  {/* Table Header: Features */}
                  <th className="py-5 px-6 text-left text-sm font-semibold uppercase tracking-wider text-[#828a96]">
                    Features
                  </th>
                  {/* Table Header: Lifetime Plan */}
                  <th className="py-5 px-6 text-center text-sm font-semibold uppercase tracking-wider text-[#828a96]">
                    Lifetime Plan
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {/* Mapping over the features array to generate table rows dynamically */}
                {features.map((feature, index) => (
                  <tr
                    key={index}
                    className="hover:bg-white/5 transition-colors duration-200"
                  >
                    <td className="py-4 px-6">{feature.name}</td>
                    <td className="py-4 px-6 text-center font-semibold">
                      {feature.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingTable;
