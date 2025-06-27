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
    <div className="min-h-screen bg-[#181e2b]">
      <Navbar />

      {/* Floating gradient elements */}
      <div className="fixed -top-20 -left-20 w-64 h-64 rounded-full bg-[#2962ea]/20 blur-3xl -z-0"></div>
      <div className="fixed -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#2962ea]/10 blur-3xl -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 py-24 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-28">
          <div className="inline-flex items-center bg-[#2962ea]/10 text-[#2962ea] px-4 py-2 rounded-full mb-4">
            <span className="mr-2">⚡</span> The fastest way to generate legal
            docs
          </div>
          <h1 className="text-5xl font-bold text-center text-[#e4e6e8] pb-4 leading-tight">
            Generate <span className="text-[#2962ea]">T&C</span> in{" "}
            <br className="sm:hidden" />{" "}
            <span className="relative">
              60 Seconds
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#2962ea]/40 rounded-full"></span>
            </span>
          </h1>
          <p className="text-base text-gray-300 mb-8 max-w-2xl mx-auto">
            Trusted by thousands of businesses to stay legally compliant without
            the hefty lawyer fees
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              className="bg-[#2962ea] hover:bg-[#1e4bac] text-white px-8 py-4 rounded-md text-md font-medium transition-all transform hover:scale-105 shadow-lg shadow-[#2962ea]/20"
              autoFocus
            >
              Start Generating Free
            </Button>
            <Button className="bg-transparent border-2 border-[#2962ea] text-[#2962ea] hover:bg-[#2962ea]/10 px-8 py-4 rounded-md text-md font-medium transition-all transform hover:scale-105">
              See Live Demo
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-28">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#232b38] border border-[#3a4556] rounded-xl p-6 hover:border-[#2962ea]/50 transition-all"
            >
              <div className="flex items-center mb-3">
                <div className="p-2 bg-[#2962ea]/10 rounded-lg mr-3">
                  {React.cloneElement(stat.icon, {
                    className: "w-5 h-5 text-[#2962ea]",
                  })}
                </div>
                <span className="text-sm text-gray-400">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-white tx">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="mb-28">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to generate, manage, and maintain your legal
              documents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <Card
                key={idx}
                isPressable
                className="bg-[#232b38] hover:bg-[#3a4556] border border-[#3a4556] hover:border-[#2962ea]/50 transition-all group cursor-pointer hover:-translate-y-4"
              >
                <CardBody className="flex flex-col items-center text-center gap-6 p-8">
                  <div className="p-4 bg-[#2962ea]/10 rounded-full group-hover:bg-[#2962ea]/20 transition-all group-hover:rotate-12">
                    {React.cloneElement(feature.icon, {
                      className: "w-8 h-8 text-[#2962ea]",
                    })}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 mb-3">{feature.desc}</p>
                    <p className="text-sm text-[#2962ea] font-mono bg-[#2962ea]/10 px-3 py-1 rounded-full inline-block">
                      {feature.stat}
                    </p>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="relative mb-28">
          <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-[#2962ea]/10 blur-xl"></div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-[#2962ea]/10 blur-xl"></div>

          <div className="bg-gradient-to-br from-[#232b38] to-[#1a2230] rounded-2xl p-12 border border-[#3a4556] relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#2962ea]/10 blur-3xl"></div>
            <div className="max-w-4xl mx-auto text-center relative">
              <div className="text-[#2962ea] mb-4 text-5xl">"</div>
              <p className="text-2xl italic text-gray-300 mb-8 leading-relaxed">
                "This generator saved our startup $12,000 in legal fees and
                helped us launch 3 weeks faster. The auto-updating feature alone
                is worth the subscription."
              </p>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-[#2962ea]/20 flex items-center justify-center text-white font-bold mb-3">
                  JD
                </div>
                <div>
                  <p className="text-white font-medium">John D.</p>
                  <p className="text-gray-400 text-sm">Founder, SaaS Startup</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center relative">
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-40 h-40 rounded-full bg-[#2962ea]/10 blur-3xl"></div>

          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Protect Your Business?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses who trust our platform for their legal
            documentation needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/login">
              <Button className="bg-[#2962ea] hover:bg-[#1e4bac] text-white px-10 py-5 rounded-md text-md font-medium shadow-lg shadow-[#2962ea]/30 hover:shadow-[#1e4bac]/40 transition-all transform hover:scale-105">
                Get Started Free
              </Button>
            </Link>
            <Link to="/pricing">
              <Button className="bg-transparent border-1 border-white text-white hover:bg-white/10 px-10 py-5 rounded-md text-md font-medium transition-all transform hover:scale-105">
                Compare Plans
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <FooterPart />
    </div>
  );
}
