import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

let targetURL = "http://localhost:5000";
if (import.meta.env.VITE_WEB_ENV === "production") {
    targetURL = import.meta.env.VITE_API_URL;
} else targetURL = "http://localhost:5000";

export default defineConfig({
    server: {
        proxy: {
            "/api": {
                target: targetURL,
                changeOrigin: true,
                secure: false,
            },
        },
        host: "0.0.0.0",
        port: 3000,
    },
    plugins: [react()],
});
