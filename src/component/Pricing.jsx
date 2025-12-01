import Navbar from "./Navbar";
import FooterPart from "./FooterPart";
import { Button } from "@heroui/react";
import { Accordion, AccordionItem } from "@heroui/react";
//import { stripePromise } from "../stripe";
import { getAuth } from "firebase/auth";
import { useContext, useState } from "react";
import { GeneratedTemplatesContext } from "./GeneratedTemplatesContext.jsx";
import AlertSignIn from "./AlertSignIn.jsx";
import PricingTable from "./PricingTable.jsx";
import useStatus from "./userStatus.jsx";
import { plans } from "../config/Plans.jsx";
import { faqs } from "../config/Faqs.jsx";
import HeroPricing from "./HeroPricing.jsx";

export default function PricingPage() {
  const [alertForPlan, setAlertForPlan] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const user = getAuth().currentUser;
  const { userPlan } = useContext(GeneratedTemplatesContext);
  const { userStatus } = useStatus();
  const isPaidUser = userStatus?.isPaidUser;

  const handlePayment = (paddlePriceId) => {
    const Paddle = window.Paddle;
    const userId = user?.uid;
    const userEmail = user?.email;

    if (!user) {
      setAlertForPlan(paddlePriceId);
      return;
    }

    if (!Paddle) {
      console.error("Paddle.js is not loaded.");
      return;
    }

    setShowCheckout(true);
    setTimeout(() => {
      const targetOverlay = document.getElementById("checkout-container");

      if (!targetOverlay) {
        console.error("checkout-container or frame not found!");
        return;
      }

      try {
        Paddle.Checkout.open({
          items: [{ priceId: paddlePriceId, quantity: 1 }],
          settings: {
            displayMode: "inline",
            theme: "dark",
            frameTarget: "checkout-container",
            frameStyle:
              "width: 100%;  background-color: transparent; border: none;",
          },
          successUrl: "https://boltterms.com/success",
          cancelUrl: "https://boltterms.com/cancel",
          // specific custom data if needed
          customData: {
            userId: userId,
          },
        });
      } catch (error) {
        console.error("Error during Paddle checkout:", error);
      }
    }, 0);
  };

  const itemClasses = {
    base: "w-full",
    title: "text-[#e4e6e8] text-base font-medium",
    trigger:
      "flex items-center gap-3 py-4 px-5 text-left text-[#e4e6e8] rounded-lg transition-colors  hover:bg-[#3a4556]",
    indicator: "text-[#828a96]",
    content: "text-[#828a96] text-sm px-5 pb-4 pt-3",
  };

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

      <HeroPricing />

      {/* Separator SVG */}
      <div className="relative z-10">
        <svg viewBox="0 0 1440 100" className="text-[#232b38] fill-current">
          <path d="M0,0 C480,100 960,0 1440,100 L1440,00 L0,0 Z"></path>
        </svg>
      </div>

      {/* Checkout Overlay */}
      {showCheckout && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-md bg-[#181e2b]/60"
          onClick={() => setShowCheckout(false)}
        >
          {/* Modal Box */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative rounded-xl shadow-2xl p-4 w-[60vw]  max-h-[90vh] overflow-auto border border-[#3a4556]"
            style={{
              backgroundColor: "#232b38", // Matches your FAQ/Separators
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)", // Deep shadow
            }}
          >
            {/* Close Button (Optional but recommended for UX) */}
            <button
              onClick={() => setShowCheckout(false)}
              className="absolute top-4 right-4 text-[#828a96] hover:text-[#e4e6e8] transition-colors"
            >
              ✕
            </button>

            <div id="checkout-container" className="checkout-container"></div>
          </div>
        </div>
      )}

      {/* Pricing Tiers */}
      <div className="max-w-xl md:max-w-3xl  lg:max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8  lg:grid-cols-3 ">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg overflow-hidden relative bg-[#374151] ${
                plan.popular ? "ring-2 ring-blue-500" : ""
              }`}
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
                    plan.popular && !isPaidUser
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-700 cursor-not-allowed opacity-60"
                  }`}
                  style={{ color: "white" }}
                  disabled={
                    !plan.popular ||
                    userPlan === "LIFETIME" ||
                    userPlan === plan.paddlePriceId ||
                    isPaidUser
                  }
                  onPress={() => handlePayment(plan.paddlePriceId)}
                >
                  {isPaidUser
                    ? "Enjoy Your Premium Access"
                    : "Unlock the Full Story"}
                </Button>
                {alertForPlan === plan.paddlePriceId && <AlertSignIn />}
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
