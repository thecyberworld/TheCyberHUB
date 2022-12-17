import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            "/api": "http://localhost:5000",
        },
        host: "0.0.0.0",
        port: 3000,
    },
    // preview: {
    //     port: 8080
    // },
    plugins: [react()],
});
