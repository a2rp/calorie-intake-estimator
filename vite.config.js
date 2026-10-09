import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    base: "/calorie-intake-estimator/",
    build: { sourcemap: false },
    plugins: [react()],
});