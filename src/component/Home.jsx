/* eslint-disable no-unused-vars */
import Navbar from "./Navbar.jsx";
import { Button, Image } from "@heroui/react";
import Arrow from "./../assets/arrow.png";
import Card from "./CardSection.jsx";
import Why from "./Why.jsx";
import FooterPart from "./FooterPart.jsx";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./../FirebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";
import SupaDemoEmbed from "./SupaDemoEmbed.jsx";
import HowItWorks from "./HowItWorks.jsx";
import GeneratorWidget from "./GeneratorWidget.jsx";
import { motion } from "framer-motion";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="w-full h-full relative overflow-hidden">
        <Navbar />

        {/* Subtle background elements */}
        <div className="fixed -top-20 -left-20 w-64 h-64 rounded-full bg-[#2962ea]/20 blur-3xl -z-0"></div>
        <div className="fixed -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#2962ea]/10 blur-3xl -z-0"></div>

        <div className="flex flex-col items-center justify-center gap-4 mt-10 w-full z-10 relative">
          <motion.div
            className="flex flex-col items-center justify-center mx-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center bg-[#2962ea]/10 border border-[#2962ea]/20 text-[#2962ea] px-6 py-3 rounded-full mb-6 hover:scale-105 hover:bg-[#2962ea]/15 transition-all duration-300">
              <span className="mr-2">⚡</span>
              The fastest way to generate legal docs
            </div>

            <h1 className="text-[37px] font-extrabold text-center text-[#e4e6e8] pb-4 leading-tight">
              Generate Professional{" "}
              <span className="text-[#2962ea]">
                Terms
                <br />
                <span className="text-[#e4e6e8]">&</span> Conditions
              </span>{" "}
              in Minutes
            </h1>

            <p className="text-center text-[#9CA3AF] text-sm md:text-base max-w-md leading-relaxed">
              Create legally compliant T&C documents for your business with our
              smart
              <br />
              generator. No legal knowledge required.
            </p>
          </motion.div>

          {/* Button section */}
          <div className="flex gap-6 items-center justify-center mt-4">
            <div className="relative flex items-center justify-center">
              <Link to="/generate">
                <Button
                  onPress={() => console.log("Start Generating")}
                  className="flex items-center justify-center gap-2 bg-[#2962ea] w-52 h-12 rounded-lg text-[#e4e6e8] font-semibold hover:bg-[#2962ea]/90 hover:scale-105 transition-all duration-300 group"
                >
                  Start Generating
                  <Image
                    src={Arrow}
                    width={24}
                    height={24}
                    alt=""
                    className="ml-1 filter brightness-0 invert group-hover:translate-x-1 transition-transform duration-300"
                  />
                </Button>
              </Link>
            </div>

            <Link to="/templates">
              <Button className="bg-[#394251]/60 border border-white/10 px-8 h-12 rounded-lg text-[#e4e6e8] hover:bg-[#394251]/80 hover:scale-105 transition-all duration-300">
                View Templates
              </Button>
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex gap-8 items-center mt-8 text-[#9CA3AF] text-sm">
            <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>1000+ Businesses Protected</span>
            </div>
            <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span>3 Min Average Generation</span>
            </div>
          </div>
        </div>

        {/* Simple scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-70">
          <div className="w-6 h-10 border-2 border-[#2962ea]/50 rounded-full flex justify-center animate-bounce">
            <div className="w-1 h-3 bg-[#2962ea] rounded-full mt-2" />
          </div>
        </div>

        <HowItWorks />

        {/* Demo Section */}
        <section className="w-full flex flex-col items-center justify-center py-16 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-full max-w-4xl"
          >
            <SupaDemoEmbed />
          </motion.div>
        </section>

        <Why />
        <FooterPart />
      </div>
    </>
  );
};

export default Home;
