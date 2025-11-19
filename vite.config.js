import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      "localhost:5173",
        "856c2742cbac.ngrok-free.app" // ✅ allow any ngrok HTTPS tunnel
    ],
  },
  optimizeDeps: {
    include: ["react", "react-dom", "@heroui/react", "react-router-dom"],
  },
});
