import { useEffect } from "react";

export const PaddleProvider = ({ children }) => { 
   useEffect(() => {
      const script = document.createElement("script");
      script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
      script.onload = () => {
         window.Paddle.Setup({ token: "test_94bafca7620d0e7190f338ba2fe" }); // Replace with your Paddle Vendor ID
         window.Paddle.Environment.set("sandbox"); // Remove or change for production
      };
      document.body.appendChild(script);
   }, []);

   return children;
}