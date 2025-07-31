import Navbar from "./Navbar";
import FooterPart from "./FooterPart";
import { Button } from "@heroui/react";
import { Accordion, AccordionItem } from "@heroui/react";
import { stripePromise } from "../stripe";
import { getAuth } from "firebase/auth";
import { useContext } from "react";
import { GeneratedTemplatesContext } from "./GeneratedTemplatesContext.jsx";
export default function PricingPage() {
  const user = getAuth().currentUser;
  const { userPlan, setUserPlanAfterPurchase } = useContext(
    GeneratedTemplatesContext
  );

  const handlePayment = async (stripePriceId) => {
    try {
      if (!user) {
        throw new Error("User not authenticated. Please log in.");
      }
      const idToken = await user.getIdToken();
      const response = await fetch(
        "https://us-central1-tc-generator-5bdea.cloudfunctions.net/createCheckoutSession",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({ stripePriceId }),
        }
      );

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
        successUrl: window.location.origin + "/success",
        cancelUrl: window.location.origin + "/cancel",
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
      answer: "Yes! Pay once, use forever. No subscriptions or hidden charges.",
    },
    {
      question: "Can I upgrade to future subscriptions later?",
      answer:
        "Absolutely. You'll get an upgrade discount when subscriptions launch.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "We offer a 7-day refund window if you're not satisfied. No questions asked.",
    },
    {
      question: "Will my access change when subscriptions launch?",
      answer: "Nope. Lifetime users keep all their benefits permanently.",
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
            Simple, transparent pricings
          </h1>
          <p
            className="text-center text-[#9CA3AF] text-md"
            style={{ color: "#828a96" }}
          >
            One-time lifetime access — with optional subscriptions coming soon.
          </p>
        </div>
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
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2
          className="text-2xl font-bold mb-8 text-center"
          style={{ color: "#e4e6e8" }}
        >
          What's included
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full" style={{ color: "#e4e6e8" }}>
            <thead>
              <tr style={{ borderBottomColor: "#4c5562" }}>
                <th className="pb-4 px-4 text-left">Features</th>
                <th className="pb-4 px-4 text-center">Lifetime</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottomColor: "#4c5562" }}>
                <td className="py-4 px-4">TC generations</td>
                <td className="py-4 px-4 text-center">Unlimited</td>
              </tr>
              <tr style={{ borderBottomColor: "#4c5562" }}>
                <td className="py-4 px-4">Export formats</td>
                <td className="py-4 px-4 text-center">PDF + DOCX</td>
              </tr>
              <tr style={{ borderBottomColor: "#4c5562" }}>
                <td className="py-4 px-4">Templates & branding</td>
                <td className="py-4 px-4 text-center">Included</td>
              </tr>
              <tr style={{ borderBottomColor: "#4c5562" }}>
                <td className="py-4 px-4">Custom fields</td>
                <td className="py-4 px-4 text-center">✅</td>
              </tr>
              <tr>
                <td className="py-4 px-4">Support</td>
                <td className="py-4 px-4 text-center">Email (48h)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

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
