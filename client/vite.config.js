import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // 👉 Đổi từ react-refresh sang plugin-react chuẩn này

export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: false,
    modulePreload: {
      polyfill: false,
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
