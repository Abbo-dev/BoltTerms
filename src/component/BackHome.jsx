import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";

export default function BackToHome() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="absolute top-6 left-6"
    >
      <Link to="/">
        <Button className="group flex items-center gap-2 text-[#e4e6e8] hover:text-white bg-[#232b38] hover:bg-[#1F2937] px-4 py-2 rounded-full shadow transition-all duration-300 checked:bg-[#2962ea]">
          <ArrowLeftIcon className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1.5" />
          <span className="text-sm font-medium">Back to Home</span>
        </Button>
      </Link>
    </motion.div>
  );
}
