import { th } from "framer-motion/client";
import { useEffect } from "react";

export const PaddleProvider = ({ children }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.onload = () => {
      const Paddle = window.Paddle;
      if (!Paddle) return;

      Paddle.Environment.set("sandbox");
      Paddle.Initialize({
        token: "test_94bafca7620d0e7190f338ba2fe",
        checkout: {
          settings: {
            displayMode: "inline",
            variant: "one-page",
            frameTarget: "checkout-container",
            theme: "light",
          },
        },
      });
    };
    document.body.appendChild(script);
  }, []);

  return children;
};
