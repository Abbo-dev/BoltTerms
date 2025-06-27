import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./AuthContext.jsx";
import { FormProvider } from "./FormDataContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <HeroUIProvider>
        <ToastProvider />
        <AuthProvider>
          <FormProvider>
            <App />
          </FormProvider>
        </AuthProvider>
      </HeroUIProvider>
    </BrowserRouter>
  </StrictMode>
);
