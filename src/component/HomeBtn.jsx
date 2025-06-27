import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function ReturnHomeButton() {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate("/")}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 bg-[#2962ea] text-white px-4 py-2 rounded-xl shadow-md transition-all hover:shadow-lg"
    >
      <ArrowLeftIcon className="w-5 h-5" />
      <span className="font-medium">Return Home</span>
    </motion.button>
  );
}
