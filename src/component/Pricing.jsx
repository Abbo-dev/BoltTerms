/* eslint-disable no-unused-vars */
import Navbar from "./Navbar";
import FooterPart from "./FooterPart";
import { Button } from "@heroui/react";
import { Accordion, AccordionItem } from "@heroui/react";
import { stripePromise } from "../stripe";
import { getAuth } from "firebase/auth";
import { useContext, useState } from "react";
import { GeneratedTemplatesContext } from "./GeneratedTemplatesContext.jsx";
import AlertSignIn from "./AlertSignIn.jsx";
import PricingTable from "./PricingTable.jsx";
export default function PricingPage() {
  const [alertForPlan, setAlertForPlan] = useState(false);
  const user = getAuth().currentUser;
  const { userPlan } = useContext(GeneratedTemplatesContext);

  const handlePayment = async (stripePriceId) => {
    try {
      if (!user) {
        setAlertForPlan(stripePriceId);
        return;
      }

      setAlertForPlan(null);
      const functionsUrl = import.meta.env.VITE_FUNCTIONS_URL;

      const idToken = await user.getIdToken();
      const response = await fetch(functionsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ stripePriceId }),
      });

      const result = await response.json();
      const sessionId = result.sessionId;

      if (!sessionId) {
        throw new Error("No sessionId returned from function.");
      }

      // Add success_url and cancel_url to the session creation
      if (!result.success_url || !result.cancel_url) {
        console.log("Payment session URLs:", result);
      }

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        console.error("Stripe redirect error:", error.message);
        alert("Error redirecting to Stripe: " + error.message);
      }
    } catch (error) {
      console.error("Error during handlePayment:", error.message, error.stack);
      alert("Payment failed: " + error.message);
    }
  };

  const plans = [
    {
      name: "Lifetime Access",
      price: "$19",
      description: "One-time payment. No subscriptions. Instant access.",
      features: [
        "Unlimited TC generations",
        "PDF & DOCX export",
        "Access to all templates",
        "Custom fields & branding",
        "Email support (48h response)",
      ],
      cta: "Buy Once, Use Forever",
      stripePriceId: "price_1Rdt73COmRZKMVKqPPM96VIo",
      popular: true,
    },
    {
      name: "Pro Monthly (Coming Soon)",
      price: "$9",
      period: "/month",
      description: "Subscription for power users — launching soon",
      features: [
        "Everything in Lifetime plan",
        "Priority support (24h)",
        "Bulk generation",
        "Team seats",
      ],
      cta: "Coming Soon",
      popular: false,
    },
    {
      name: "Pro Annual (Coming Soon)",
      price: "$90",
      period: "/year",
      description: "Annual savings with additional features — launching soon",
      features: [
        "Everything in Pro Monthly",
        "Dedicated account manager",
        "API access (beta)",
      ],
      cta: "Coming Soon",
      popular: false,
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

  const faqs = [
    {
      question: "Is this really a one-time payment?",
      answer:
        "Yes, it is. We offer a lifetime license that you acquire with a single payment. This means you pay once and have access to all the features included in your plan forever, without any recurring subscriptions or hidden fees.",
    },
    {
      question: "Can I upgrade to future subscriptions later?",
      answer:
        "Absolutely. We value our early supporters. When we introduce new subscription models in the future, all lifetime license holders will be offered a substantial discount to upgrade, should they choose to do so.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "We offer a 7-day, no-questions-asked refund policy. If you find that our service doesn't meet your needs within the first week of your purchase, you are entitled to a full refund.",
    },
    {
      question: "Will my access change when subscriptions launch?",
      answer:
        "Your lifetime access will not be affected at all. As a lifetime user, you will permanently retain all the features and benefits that were available at the time of your purchase, regardless of any future changes to our pricing or subscription models.",
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#181e2b" }}>
      <Navbar />
      {/* Floating gradient elements */}
      <div className="fixed -top-20 -left-20 w-64 h-64 rounded-full bg-[#2962ea]/20 blur-3xl -z-0"></div>
      <div className="fixed -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#2962ea]/10 blur-3xl -z-0"></div>
      {/* Launch Alert */}
      <div className="bg-[#2962ea] text-white text-center py-3 text-sm font-medium">
        💡 Subscriptions launching soon — grab lifetime access for $19 before
        it's gone!
      </div>

      {/* Hero Section */}
      <div className="relative" style={{ backgroundColor: "#232b38" }}>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-4xl font-bold text-center text-[#e4e6e8] pb-4 "
            style={{ color: "#e4e6e8" }}
          >
            Simple, transparent pricing
          </h1>

          <p
            className="text-center text-[#9CA3AF] text-md"
            style={{ color: "#828a96" }}
          >
            One-time lifetime access — with optional subscriptions coming soon.
          </p>
        </div>
      </div>
      {/* Separator SVG */}
      <div className="relative z-10">
        <svg viewBox="0 0 1440 100" className="text-[#232b38] fill-current">
          <path d="M0,0 C480,100 960,0 1440,100 L1440,00 L0,0 Z"></path>
        </svg>
      </div>

      {/* Pricing Tiers */}
      <div className="max-w-xl md:max-w-3xl  lg:max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8  lg:grid-cols-3 ">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg overflow-hidden relative ${
                plan.popular ? "ring-2 ring-blue-500" : ""
              }`}
              style={{ backgroundColor: "#374151" }}
            >
              {plan.popular && (
                <div className="absolute top-1 right-1 bg-blue-600 text-white text-xs font-bold px-3 py-1 transform translate-x-2 -translate-y-2 rounded-bl-lg">
                  BEST DEAL
                </div>
              )}
              <div className="p-6">
                <h2
                  className="text-2xl font-bold mb-2"
                  style={{ color: "#e4e6e8" }}
                >
                  {plan.name}
                </h2>
                <div className="flex items-baseline mb-4">
                  <span
                    className="text-4xl font-extrabold"
                    style={{ color: "#e4e6e8" }}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="ml-1 text-lg" style={{ color: "#828a96" }}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="mb-6" style={{ color: "#828a96" }}>
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span style={{ color: "#e4e6e8" }}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full py-3 px-4 rounded-md font-medium ${
                    plan.popular
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-700 cursor-not-allowed opacity-60"
                  }`}
                  style={{ color: "white" }}
                  disabled={!plan.popular || userPlan === "LIFETIME"}
                  onPress={() => handlePayment(plan.stripePriceId)}
                >
                  {userPlan === "LIFETIME" ? "Already Purchased" : plan.cta}
                </Button>
                {alertForPlan === plan.stripePriceId && <AlertSignIn />}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Separator SVG */}
      <div className="relative z-10">
        <svg viewBox="0 0 1440 100" className="text-[#232b38] fill-current">
          <path d="M0,0 C480,100 960,0 1440,100 L1440,00 L0,0 Z"></path>
        </svg>
      </div>

      <PricingTable />

      {/* FAQs */}
      <div className="space-y-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
          className="rounded-xl overflow-hidden bg-[#232b38] border border-[#3a4556] w-full"
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

      {/* Enterprise CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          className="rounded-lg p-8 text-center"
          style={{ backgroundColor: "#374151" }}
        >
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#e4e6e8" }}>
            Need custom solutions?
          </h2>
          <p className="max-w-2xl mx-auto mb-6" style={{ color: "#828a96" }}>
            Our enterprise plans offer white-labeling, bulk generation, and
            custom integrations.
          </p>
          <button
            className="px-6 py-3 rounded-md font-medium"
            style={{ backgroundColor: "#2962ea", color: "white" }}
          >
            Contact Enterprise Sales
          </button>
        </div>
      </div>

      <FooterPart />
    </div>
  );
}
