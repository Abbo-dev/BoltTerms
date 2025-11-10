import { useEffect } from "react";

export const PaddleProvider = ({ children }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.onload = () => {
      const Paddle = window.Paddle;
      Paddle.Initialize({
        token: "test_94bafca7620d0e7190f338ba2fe",
        environment: "sandbox",
      });

      // Configure checkout defaults globally
      Paddle.Checkout.Settings.set({
        displayMode: "inline",
        variant: "single-page",
        theme: "light",
        frameTarget: "checkout-container",
        frameInitialHeight: 600,
        frameStyle: "width:100%;border:none;",
      });
    };
    document.body.appendChild(script);
  }, []);

  return children;
};
