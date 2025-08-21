import { Card, CardBody, Button } from "@heroui/react";
import {
  LightningBoltIcon,
  UpdateIcon,
  FileTextIcon,
  DownloadIcon,
  ClockIcon,
} from "./Icons";
import React from "react";
import Navbar from "./Navbar";
import FooterPart from "./FooterPart";
import { ScaleIcon } from "@heroicons/react/20/solid";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
export default function FeaturesPage() {
  const features = [
    {
      icon: <LightningBoltIcon />,
      title: "1-Click Generation",
      desc: "Generate T&C faster than ordering coffee",
      stat: "0.7s average generation time",
    },
    {
      icon: <UpdateIcon />,
      title: "Auto-Updating",
      desc: "Always compliant with 2024 laws",
      stat: "37+ regulatory updates/year",
    },
    {
      icon: <FileTextIcon />,
      title: "Industry Templates",
      desc: "eCommerce, SaaS, Crypto templates",
      stat: "12+ specialized templates",
    },
    {
      icon: <DownloadIcon />,
      title: "PDF Export",
      desc: "Download ready-to-use files",
      stat: "10,000+ monthly exports",
    },
  ];

  const stats = [
    {
      value: "15,000+",
      label: "Businesses Trust Us",
      icon: <DownloadIcon />,
    },
    { value: "99.9%", label: "Uptime Reliability", icon: <ClockIcon /> },
    { value: "180+", label: "Countries Covered", icon: <GlobeAltIcon /> },
    { value: "100%", label: "Legal Compliance", icon: <ScaleIcon /> },
  ];

  return (
    <>
      <div className="bg-[#181e2b] text-white relative ">
        {/* Background glow */}
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#2962ea]/20 blur-3xl rounded-full z-0 " />
        <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-[#2962ea]/10 blur-3xl rounded-full z-0 " />

        <Navbar />

        <div className="relative z-10">
          {/* Hero */}
          <section className="text-center py-24 px-4 max-w-5xl mx-auto">
            <div className="inline-flex items-center bg-[#2962ea]/10 text-[#2962ea] px-4 py-2 rounded-full mb-4 text-sm font-medium">
              ⚡ The fastest way to generate legal docs
            </div>
            <h1 className="text-4xl font-extrabold mb-6 leading-tight">
              Generate <span className="text-[#2962ea]">T&C</span> in{" "}
              <span className="relative inline-block">
                60 Seconds
                <span className="absolute bottom-0 left-0 w-full h-1 bg-[#2962ea]/40 rounded-full" />
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-xl mx-auto mb-10">
              Trusted by thousands of businesses to stay legally compliant
              without the hefty lawyer fees.
            </p>
            <div className="flex justify-center gap-4 flex-col sm:flex-row">
              <Button
                as={Link}
                to="/"
                className="bg-[#2962ea] hover:bg-[#1e4bac] px-6 py-3 text-md font-medium shadow-lg transition-all rounded-md"
              >
                Start Generating Free
              </Button>
              <Button
                as={HashLink}
                smooth
                to={"/#supa-demo-embed"}
                className="border border-[#2962ea] text-[#2962ea] hover:bg-[#2962ea]/10 px-6 py-3 rounded-md text-md"
              >
                See Live Demo
              </Button>
            </div>
          </section>

          {/* Separator SVG */}
          <div className="relative z-10">
            <svg viewBox="0 0 1440 100" className="text-[#232b38] fill-current">
              <path d="M0,0 C480,100 960,0 1440,100 L1440,00 L0,0 Z"></path>
            </svg>
          </div>

          {/* Stats Section */}
          <section className="bg-[#232b38] py-16 px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-[#1d2532] border border-[#3a4556] rounded-xl p-6 hover:border-[#2962ea]/60 transition-all"
                >
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-[#2962ea]/10 rounded-lg mr-3">
                      {React.cloneElement(stat.icon, {
                        className: "w-5 h-5 text-[#2962ea]",
                      })}
                    </div>
                    <span className="text-sm text-gray-400">{stat.label}</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Features Section */}
          <section className="py-24 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Everything you need to generate, manage, and maintain your legal
                documents
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-[#232b38] border border-[#3a4556] p-8 rounded-2xl hover:border-[#2962ea]/50 transition-transform hover:-translate-y-2 group"
                >
                  <div className="mb-6">
                    <div className="p-4 bg-[#2962ea]/10 rounded-full inline-block group-hover:bg-[#2962ea]/20 transition-all">
                      {React.cloneElement(feature.icon, {
                        className: "w-6 h-6 text-[#2962ea]",
                      })}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-300 mb-4">{feature.desc}</p>
                  <span className="text-sm text-[#2962ea] font-mono bg-[#2962ea]/10 px-3 py-1 rounded-full inline-block">
                    {feature.stat}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-[#1d2532] py-20 px-4">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Protect Your Business?
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">
              Join thousands of businesses who trust our platform for their
              legal documentation needs.
            </p>
            <div className="flex justify-center gap-4 flex-col sm:flex-row">
              <Link to="/login">
                <Button className="bg-[#2962ea] hover:bg-[#1e4bac] text-white px-10 py-4 rounded-md text-md font-medium shadow-lg shadow-[#2962ea]/30 hover:shadow-[#1e4bac]/40 transition-all transform hover:scale-105">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/pricing">
                <Button className="bg-transparent border border-white text-white hover:bg-white/10 px-10 py-4 rounded-md text-md transition-all transform hover:scale-105">
                  Compare Plans
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
      <FooterPart />
    </>
  );
}
