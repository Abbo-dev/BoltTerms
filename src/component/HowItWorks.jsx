/* eslint-disable no-unused-vars */

import { Link } from "react-router-dom";
import {
  FaUserAlt,
  FaFileAlt,
  FaClock,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { Button } from "@heroui/react";
import { Card, CardBody } from "@heroui/card";
import { motion } from "framer-motion";
import GeneratorWidget from "./GeneratorWidget";

function HowItWorks() {
  const steps = [
    {
      icon: <FaUserAlt />,
      title: "Enter Business Info",
      // Rewritten to 68 characters
      desc: "Enter your company details to customize your legal document instantly.",
    },
    {
      icon: <FaFileAlt />,
      title: "Choose a Template",
      // Rewritten to 67 characters
      desc: "Pick lawyer-approved templates designed for your specific industry.",
    },
    {
      icon: <FaClock />,
      title: "Get T&Cs in Minutes",
      // Rewritten to 65 characters
      desc: "Download ready-to-use documents to publish on your website today.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Stay Protected",
      // Rewritten to 66 characters
      desc: "Keep your business safe with clear, professional legal protection.",
    },
  ];

  return (
    <section className="w-full flex flex-col items-center justify-center py-20 px-6 mt-10 relative">
      {/* Section Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-bold text-[#e4e6e8] mb-4 text-center"
      >
        From Start to <span className="text-[#2962ea]">Secure </span> in Minutes
      </motion.h2>

      {/* Steps as Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 p-6 md:p-10 relative z-10 max-w-6xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            className="h-full" // Ensure motion div takes full height
          >
            <Card className="h-full rounded-xl bg-[#242d39] border border-transparent hover:border-[#2962ea]/30 hover:shadow-lg hover:shadow-[#2962ea]/20 transition-all duration-300 group">
              <CardBody className="flex flex-col items-center text-center p-6 h-full justify-between">
                {/* Top Content Wrapper (Icon + Text) */}
                <div className="flex flex-col items-center w-full">
                  {/* Icon */}
                  <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#2962ea]/10 text-[#2962ea] text-2xl mb-4 border border-[#2962ea]/20 group-hover:bg-[#2962ea]/15 group-hover:border-[#2962ea]/30 transition-all duration-300">
                    <div className="group-hover:scale-110 transition-transform duration-200">
                      {step.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <p className="text-[#e4e6e8] font-semibold mb-3 group-hover:text-[#2962ea] transition-colors duration-200 min-h-[1.5rem] flex items-end">
                    {step.title}
                  </p>

                  {/* Description - Added min-h to force uniformity */}
                  <p className="text-[#9CA3AF] text-sm leading-relaxed min-h-[60px]">
                    {step.desc}
                  </p>
                </div>

                {/* Checkmark animation (Pushed to bottom) */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.5, duration: 0.3 }}
                  className="mt-2"
                >
                  <FaCheckCircle className="text-[#2962ea]" />
                </motion.div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Generator Widget */}
      <GeneratorWidget className="m-12" />

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-10 flex flex-col items-center text-center z-10"
      >
        <p className="text-[#9CA3AF] mb-4 text-sm md:text-base">
          Start protecting your business today — it only takes 3 minutes.
        </p>
        <Link to="/generate">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-[#2962ea] px-10 h-12 rounded-lg text-[#e4e6e8] font-semibold text-lg hover:bg-[#2962ea]/90 transition-all duration-300 flex items-center gap-2">
              <FaShieldAlt /> Try It Now
            </Button>
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}

export default HowItWorks;
