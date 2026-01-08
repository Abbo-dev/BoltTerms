
import { useEffect } from "react";

export const PaddleProvider = ({ children }) => {
  useEffect(() => {
    const paddleEnv = import.meta.env.VITE_PADDLE_ENV || "sandbox";
    const paddleToken = import.meta.env.VITE_PADDLE_CLIENT_TOKEN;
    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.onload = () => {
      const Paddle = window.Paddle;
      if (!Paddle || !paddleToken) return;

      Paddle.Environment.set(paddleEnv);
      Paddle.Initialize({
        token: paddleToken,
      });
    };
    document.body.appendChild(script);
  }, []);

  return children;
};
