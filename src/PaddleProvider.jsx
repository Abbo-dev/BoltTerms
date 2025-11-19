// PaddleProvider.jsx
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
            variant: "single-page", // single-page for clean look
            theme: "light",
            frameTarget: "checkout-container",
            frameInitialHeight: 600,
            frameStyle:
              "width:100%; border:none; border-radius:16px; overflow:hidden;",
          },
        },
      });
    };
    document.body.appendChild(script);
  }, []);

  return children;
};
