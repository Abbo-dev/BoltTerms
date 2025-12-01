/* eslint-disable no-unused-vars */
import Navbar from "./Navbar.jsx";
import { Button, Image } from "@heroui/react";
import Arrow from "./../assets/arrow.png";
import Why from "./Why.jsx";
import FooterPart from "./FooterPart.jsx";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./../FirebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";
import SupaDemoEmbed from "./SupaDemoEmbed.jsx";
import HowItWorks from "./HowItWorks.jsx";
import { motion } from "framer-motion";
import ComingSoon from "./ComingSoon.jsx";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden">
      
      <Navbar />
      {/* Subtle background elements */}
      <div className="fixed -top-20 -left-20 w-64 h-64 rounded-full bg-[#2962ea]/20 blur-3xl -z-0"></div>
      <div className="fixed -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#2962ea]/10 blur-3xl -z-0"></div>
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center gap-4 mt-16 w-full z-10 relative">
        <motion.div
          className="flex flex-col items-center justify-center mx-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl font-extrabold tracking-tight mt-10">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500 ">
              Instant Legal Docs
            </span>
            <br />
            <span className="text-[#2962ea]">for SaaS Founders</span>
          </h1>
          <p className="text-center text-[#9CA3AF] text-sm md:text-base max-w-md leading-relaxed mt-3">
            Generate professional, compliant Terms & Conditions instantly. No
            legal knowledge required.
          </p>
        </motion.div>
        <div className="inline-flex items-center bg-[#2962ea]/10 border border-[#2962ea]/20 text-[#2962ea] text-sm px-4 py-2 rounded-full ">
          ⚡ Instant Legal Docs
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-6 items-center justify-center mt-6">
          <Link to="/generate">
            <Button className="flex items-center justify-center gap-2 bg-[#2962ea] w-52 h-12 rounded-lg text-[#e4e6e8] font-semibold hover:bg-[#2962ea]/90 hover:scale-105 transition-all duration-300 group">
              Start Generating
              <Image
                src={Arrow}
                width={22}
                height={22}
                alt=""
                className="ml-1 filter brightness-0 invert group-hover:translate-x-1 transition-transform duration-300"
              />
            </Button>
          </Link>

          <Link to="/templates">
            <Button className="bg-[#394251]/60 border border-white/10 px-8 h-12 rounded-lg text-[#e4e6e8] hover:bg-[#394251]/80 hover:scale-105 transition-all duration-300">
              View Templates
            </Button>
          </Link>
        </div>

        <p className="text-xs text-[#9CA3AF] mt-3">
          ⚡ No signup required • Free to try
        </p>

        {/* Social Proof */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-[#9CA3AF] text-sm mt-8">
          <span>✅ 1000+ Businesses Protected</span>
          <span>⏱ Avg 3-Minute Setup</span>
          <span>🔒 Always Compliant</span>
        </div>
      </div>{" "}
      {/* Separator SVG */}
      <div className="relative z-10 mt-8">
        <svg viewBox="0 0 1440 100" className="text-[#232b38] fill-current">
          <path d="M0,0 C480,100 960,0 1440,100 L1440,00 L0,0 Z"></path>
        </svg>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-70">
        <div className="w-6 h-10 border-2 border-[#2962ea]/50 rounded-full flex justify-center animate-bounce">
          <div className="w-1 h-3 bg-[#2962ea] rounded-full mt-2" />
        </div>
      </div>
      {/* Sections */}
      <HowItWorks />
      {/* Separator SVG */}
      <div className="relative z-10">
        <svg viewBox="0 0 1440 100" className="text-[#232b38] fill-current">
          <path d="M0,0 C480,100 960,0 1440,100 L1440,00 L0,0 Z"></path>
        </svg>
      </div>
      <SupaDemoEmbed />
      <Why />
      {/* Final CTA */}
      <section className="w-full py-16 text-center bg-[#1a202c] mt-20 bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur">
        <h2 className="text-2xl font-bold text-[#e4e6e8] mb-4">
          Ready to Generate Your T&Cs?
        </h2>
        <p className="text-[#9CA3AF] mb-6">
          Start for free. No credit card required.
        </p>
        <Link to="/generate">
          <Button className="bg-[#2962ea] w-56 h-12 text-[#e4e6e8] font-semibold hover:bg-[#2962ea]/90 hover:scale-105 transition-all duration-300 ">
            Start Generating Now
          </Button>
        </Link>
      </section>
      <FooterPart />
    </div>
  );
};

export default Home;
