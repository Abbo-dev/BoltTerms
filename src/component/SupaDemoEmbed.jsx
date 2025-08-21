import { motion } from "framer-motion";
import { FaPlay, FaRocket, FaClock, FaCheckCircle } from "react-icons/fa";

function SupaDemoEmbed() {
  return (
    <section
      id="supa-demo-embed"
      className="w-full flex flex-col items-center justify-center px-6 relative py-16"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 max-w-3xl"
      >
        <h2 className="text-2xl font-bold text-[#e4e6e8] mb-4">
          See It In Action
        </h2>
        <div className="inline-flex items-center bg-[#2962ea]/10 border border-[#2962ea]/20 text-[#2962ea] px-4 py-2 rounded-full mb-6">
          <FaPlay className="mr-2 text-sm" />
          Live Demo
        </div>
      </motion.div>

      {/* Highlights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl"
      >
        <div className="flex items-center justify-center gap-3 text-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#2962ea]/10 text-[#2962ea] border border-[#2962ea]/20">
            <FaRocket />
          </div>
          <div>
            <h4 className="text-[#e4e6e8] font-semibold">Smart AI</h4>
            <p className="text-[#9CA3AF] text-sm">Fast document creation</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 text-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#2962ea]/10 text-[#2962ea] border border-[#2962ea]/20">
            <FaClock />
          </div>
          <div>
            <h4 className="text-[#e4e6e8] font-semibold">Done in 3 Min</h4>
            <p className="text-[#9CA3AF] text-sm">From start to download</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 text-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#2962ea]/10 text-[#2962ea] border border-[#2962ea]/20">
            <FaCheckCircle />
          </div>
          <div>
            <h4 className="text-[#e4e6e8] font-semibold">Instantly Ready</h4>
            <p className="text-[#9CA3AF] text-sm">Download & use right away</p>
          </div>
        </div>
      </motion.div>

      {/* Demo Video */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="relative w-full max-w-5xl bg-[#242d39]/50 border border-[#2962ea]/20 rounded-2xl p-4 md:p-6 hover:border-[#2962ea]/30 transition-all duration-300"
      >
        <div className="relative w-full max-h-[500px] aspect-[1.03] rounded-xl overflow-hidden bg-[#1a202c]">
          <iframe
            src="https://app.supademo.com/embed/cmdssi6ez5hcv9f96kxoutueg?embed_v=2&utm_source=embed"
            title="How to create e-commerce terms and conditions"
            loading="lazy"
            allow="clipboard-write"
            frameBorder="0"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full rounded-xl"
          />
        </div>
      </motion.div>
    </section>
  );
}

export default SupaDemoEmbed;
