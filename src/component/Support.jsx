import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/20/solid";
import FooterPart from "./FooterPart";
import Navbar from "./Navbar";
import {
  Button,
  Form,
  Input,
  Textarea,
  Accordion,
  AccordionItem,
} from "@heroui/react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  LifebuoyIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  ArrowDownTrayIcon,
  PencilSquareIcon,
  ClockIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export default function SupportPage() {
  const faqs = [
    {
      id: 1,
      question: "How do I generate a TC?",
      answer:
        "To generate a Terms & Conditions document, simply click the 'Generate' button on the homepage or templates section. You'll be guided through a short form where you'll enter basic information about your business, website, and policies. Once you fill out all required fields, your tailored document will be ready for download instantly.",
      icon: <DocumentTextIcon className="w-5 h-5 text-[#2962ea]" />,
    },
    {
      id: 2,
      question: "What formats are supported?",
      answer:
        "We currently support downloads in both PDF and DOCX formats. PDF is ideal if you want a ready-to-use version for viewing or sharing, while DOCX is perfect if you'd like to make further edits using Microsoft Word or Google Docs before publishing it on your website.",
      icon: <ArrowDownTrayIcon className="w-5 h-5 text-[#2962ea]" />,
    },
    {
      id: 3,
      question: "Is there a limit to how many TCs I can generate?",
      answer:
        "Nope! With an active subscription, you can create as many Terms & Conditions documents as you need — for multiple businesses, websites, or variations. Whether you're updating an existing policy or creating a new one from scratch, there's no cap.",
      icon: <ArrowPathIcon className="w-5 h-5 text-[#2962ea]" />,
    },
    {
      id: 4,
      question: "How do I edit a generated TC?",
      answer:
        "If you need to make changes, just return to the generator and re-enter your details. You can either load your previous inputs (if saved) or start fresh. After updating any fields, simply regenerate the document and download the latest version. For quick tweaks, we recommend using the DOCX format for easier editing in your preferred text editor.",
      icon: <PencilSquareIcon className="w-5 h-5 text-[#2962ea]" />,
    },
  ];

  const systemStatus = {
    operational: true,
    message: "All systems operational",
  };

  const supportChannels = [
    {
      title: "Email Support",
      description: "Typically responds within 4 hours",
      icon: <EnvelopeIcon className="w-6 h-6 text-[#2962ea]" />,
      action: "mailto:support@tcgenerator.com",
      actionText: "support@tcgenerator.com",
    },
    {
      title: "Phone Support",
      description: " Typically responds within 1 hour",
      icon: <PhoneIcon className="w-6 h-6 text-[#2962ea]" />,
      action: "tel:+11234567890",
      actionText: "+1 (123) 456-7890",
    },
    {
      title: "Live Chat",
      description: "Available 24/7 for premium users",
      icon: <ChatBubbleLeftRightIcon className="w-6 h-6 text-[#2962ea]" />,
      action: "#",
      actionText: "Start Chat",
    },
  ];

  const itemClasses = {
    base: "w-full",
    title: "text-[#e4e6e8] text-base font-medium",
    trigger:
      "flex items-center gap-3 py-4 px-5 text-left text-[#e4e6e8] rounded-lg transition-colors  hover:bg-[#3a4556]",
    indicator: "text-[#828a96]",
    content: "text-[#828a96] text-sm px-5 pb-4 pt-3",
  };

  return (
    <div className="min-h-screen bg-[#181e2b]">
      <Navbar />

      {/* Floating gradient elements */}
      <div className="fixed -top-20 -left-20 w-64 h-64 rounded-full bg-[#2962ea]/20 blur-3xl -z-0"></div>
      <div className="fixed -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#2962ea]/10 blur-3xl -z-0"></div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full bg-[#2962ea]/10 blur-3xl"></div>
        <div className="inline-flex items-center bg-[#2962ea]/10 text-[#2962ea] px-4 py-2 rounded-full mb-4">
          <LifebuoyIcon className="w-5 h-5 mr-2" />
          We're here to help
        </div>
        <h1 className="text-4xl font-bold text-center text-[#e4e6e8] pb-4">
          T&C Generator Support
        </h1>
        <p className="text-base text-gray-300 mb-8 max-w-2xl mx-auto">
          Get help with generating, editing, and managing your legal documents
        </p>
      </div>

      {/* Status Bar */}
      <div
        className={`py-3 px-4 transition-colors duration-500 ${
          systemStatus.operational ? "bg-green-900/40" : "bg-red-900/40"
        } border-y border-[#3a4556]`}
      >
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          {systemStatus.operational ? (
            <CheckCircleIcon className="h-5 w-5 text-green-300 animate-pulse" />
          ) : (
            <ExclamationTriangleIcon className="h-5 w-5 text-red-300 animate-bounce" />
          )}
          <span
            className={`text-sm font-medium transition-colors duration-500 ${
              systemStatus.operational ? "text-green-300" : "text-red-300"
            }`}
          >
            {systemStatus.message}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-24">
        {/* FAQ Section */}
        <div className="space-y-6 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#e4e6e8] mb-6 text-center">
            Frequently Asked Questions
          </h2>

          <Accordion
            itemClasses={itemClasses}
            motionProps={{
              variants: {
                enter: {
                  y: 0,
                  opacity: 1,
                  height: "auto",
                  transition: {
                    height: {
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    },
                    opacity: {
                      easings: "ease",
                      duration: 0.3,
                    },
                  },
                },
                exit: {
                  y: -10,
                  opacity: 0,
                  height: 0,
                  transition: {
                    height: {
                      easings: "ease",
                      duration: 0.5,
                    },
                    opacity: {
                      easings: "ease",
                      duration: 0.2,
                    },
                  },
                },
              },
            }}
            className="rounded-xl overflow-hidden bg-[#232b38] border border-[#3a4556] "
          >
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                title={
                  <div className="flex items-center gap-3">
                    {faq.icon}
                    {faq.question}
                  </div>
                }
              >
                {faq.answer}
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Support Channels */}
        <div className="grid gap-6 md:grid-cols-3  max-w-4xl mx-auto">
          {supportChannels.map((channel, index) => (
            <div
              key={index}
              className="bg-[#232b38] border border-[#3a4556] rounded-xl p-6 hover:border-[#2962ea]/50 transition-all hover:shadow-lg hover:shadow-[#2962ea]/50 hover:cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#2962ea]/10 rounded-lg">
                  {channel.icon}
                </div>
                <h3 className="text-lg font-semibold text-[#e4e6e8]">
                  {channel.title}
                </h3>
              </div>
              <div className="flex items-center gap-3 mb-4 w-full">
                <span>
                  <ClockIcon className="w-5 h-5 text-[#828a96]" />
                </span>
                <p className="text-gray-400 text-sm">{channel.description}</p>
              </div>

              <a
                href={channel.action}
                className="text-[#2962ea] hover:underline flex items-center gap-1"
              >
                {channel.actionText}
              </a>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div id="contact" className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#e4e6e8] mb-2">
              Send Us a Message
            </h2>
            <p className="text-gray-400">
              Can't find what you're looking for? Our team will get back to you
              within 24 hours.
            </p>
          </div>

          <Form className="bg-[#232b38] border border-[#3a4556] p-6 sm:p-8 rounded-xl space-y-6 hover:shadow-lg hover:shadow-[#2962ea]/50 hover:cursor-pointer max-w-5xl mx-auto ">
            <div className="flex flex-col sm:flex-row justify-between items-center w-full    gap-3">
              <Input
                label="Name"
                type="text "
                isRequired
                labelPlacement="inside"
                size="sm"
                placeholder="Your name"
              />
              <Input
                label="Email"
                type="email"
                isRequired
                labelPlacement="inside"
                size="sm"
                placeholder="your@email.com"
              />
            </div>
            <Textarea
              label="How can we help?"
              placeholder="Describe your issue or question..."
              labelPlacement="inside"
              minRows={5}
            />

            <div className="flex justify-end w-full">
              <Button
                type="submit"
                className="bg-[#2962ea] hover:bg-[#1e4bac] text-white px-8 py-3 rounded-md font-medium transition-all"
              >
                Send Message
              </Button>
            </div>
          </Form>
        </div>
      </main>

      <FooterPart />
    </div>
  );
}
