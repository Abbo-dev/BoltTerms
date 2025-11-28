/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Navbar from "./Navbar";
import CardSection from "./CardSection";
import FooterPart from "./FooterPart";
/**
 * GeneratePage Component
 * This component serves as the main container for the generator functionality.
 * It includes a header section and renders the CardSection component,
 * which contains the core form and preview logic.
 */
function GeneratePage() {
  return (
    <>
      {/* Renders the navigation bar */}
      <Navbar />

      {/* Main container with background styling and layout */}
      <div className="bg-[#181e2b]   px-4 sm:px-6 md:px-12 py-16 relative overflow-hidden mt-5">
        {/* Decorative background gradient elements */}
        <div className="fixed -top-20 -left-20 w-64 h-64 rounded-full bg-[#2962ea]/10 blur-3xl -z-0"></div>
        <div className="fixed -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#2962ea]/10 blur-3xl -z-0"></div>

        {/* Animated Page Header Section */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center bg-[#2962ea]/10 border border-[#2962ea]/20 text-[#2962ea] text-sm px-4 py-2 rounded-full mb-6">
            <SparklesIcon className="h-5 w-5 mr-2" />
            Generate Your Legal Documents
          </div>
          <h1 className="text-4xl font-extrabold text-[#e4e6e8] leading-tight">
            Terms & Conditions <span className="text-[#2962ea]">Generator</span>
          </h1>
          <p className="text-[#9CA3AF] text-medium mx-auto mt-4 max-w-2xl ">
            Fill in your business details below to instantly generate a
            professional Terms & Conditions document tailored to your needs.
          </p>
        </motion.div>

        {/* Renders your CardSection component which contains the generator form and preview */}
        <CardSection />
      </div>
      <FooterPart />
    </>
  );
}

export default GeneratePage;
