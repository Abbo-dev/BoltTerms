import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GeneratorWidget = () => {
  const navigate = useNavigate();
  const [businessName, setBusinessName] = useState("");

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!businessName.trim()) return;
    navigate(`/generate?business=${encodeURIComponent(businessName)}`);
  };

  return (
    <div className="flex items-center justify-center px-4 mt-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl p-6 sm:p-8 border border-[#2962ea]/20 rounded-xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col items-center gap-4 w-full"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-[#e4e6e8] text-center">
            Generate Your Business Terms
          </h3>
          <p className="text-sm md:text-base text-[#9CA3AF] text-center">
            Enter your business name below to generate a ready-to-use Terms &
            Conditions document.
          </p>
          <form
            onSubmit={handleGenerate}
            className="w-full flex flex-col md:flex-row items-center gap-3 mt-4"
          >
            <input
              type="text"
              placeholder="Business Name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border border-[#2962ea]/30 bg-transparent text-[#e4e6e8] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2962ea] transition-all"
            />
            <Button
              type="submit"
              disabled={!businessName.trim()}
              className={`px-6 py-3 transition-all duration-300 ${
                businessName.trim() ? "btn-primary" : "btn-muted"
              }`}
            >
              Generate
            </Button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GeneratorWidget;
