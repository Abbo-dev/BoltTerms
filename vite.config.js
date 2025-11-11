import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "9fdef87fdd4d.ngrok-free. app", // 👈 your current ngrok domain
    ],
  },
  optimizeDeps: {
    include: ["react", "react-dom", "@heroui/react", "react-router-dom"],
  },
});
