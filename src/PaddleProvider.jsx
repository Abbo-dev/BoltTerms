import { useEffect } from "react";

export const PaddleProvider = ({ children }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.onload = () => {
      const Paddle = window.Paddle;
      Paddle.Environment.set("sandbox"); // Remove or change for production
      Paddle.Initialize({
        token: "test_94bafca7620d0e7190f338ba2fe",
      });
    };
    document.body.appendChild(script);
  }, []);

  return children;
};
