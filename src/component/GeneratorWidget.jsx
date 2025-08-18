// GeneratorWidget.jsx

import { Button } from "@heroui/react";
import React from "react";

// An SVG component for the refresh icon.
const RefreshIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6" // Tailwind classes for size
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 12a9 9 0 0 1 9-9c2.39 0 4.68.94 6.34 2.61M21 3v6h-6m0 0a9 9 0 0 1-9 9c-2.39 0-4.68-.94-6.34-2.61M3 21v-6h6"
    />
  </svg>
);

const GeneratorWidget = () => {
  return (
    // Main container using your dark palette
    <div className="bg-[#242d39] p-6 sm:p-8 border border-slate-700 rounded-xl shadow-lg max-w-2xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-6">
        {/* Left Side: Document Preview */}
        <div className="relative w-full max-w-[220px] shrink-0">
          {/* Background card with a light border for contrast */}
          <div className="absolute -top-1.5 -left-1.5 w-full h-full border-2 border-slate-600 rounded-lg -z-0"></div>

          {/* Foreground card using the dark background */}
          <div className="relative bg-[#1f2937] w-full h-full p-4 border-2 border-slate-600 rounded-lg space-y-3">
            <h4 className="font-semibold text-[#e4e6e8]">Terms & Conditions</h4>
            <div className="space-y-2">
              {/* Lines are now a darker grey to be subtle on the dark background */}
              <div className="h-0.5 w-3/4 bg-slate-600"></div>
              <div className="h-0.5 w-11/12 bg-slate-600"></div>
              <div className="h-0.5 w-full bg-slate-600"></div>
            </div>
            <p className="font-semibold text-[#cbd5e1] pt-2">Business Name</p>
          </div>
        </div>

        {/* Right Side: Action Panel */}
        <div className="flex flex-col items-center md:items-start gap-4 w-full">
          <div className="flex items-center gap-2 text-[#e4e6e8]">
            <RefreshIcon />
            <h3 className="text-2xl font-bold">Generate Yours</h3>
          </div>

          {/* Button styled for a dark theme with a hover inversion effect */}
          <Button className="w-full md:w-auto px-6 py-3 font-semibold text-[#e4e6e8] bg-transparent border-2 border-slate-500 rounded-lg transition-colors hover:bg-[#2962ea] hover:text-[#fffff] focus:ring-slate-400">
            Generate Yours Free
          </Button>

          <p className="text-xs text-[#cbd5e1]">
            No credit card required. Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeneratorWidget;
