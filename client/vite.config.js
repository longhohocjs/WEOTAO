import { defineConfig } from "vite";
import react from "@vitejs/react-refresh"; // hoặc @vitejs/plugin-react tùy dự án của bạn

export default defineConfig({
  plugins: [react()],
  build: {
    // Tự động tiêm các chỉ thị gợi ý tài nguyên (modulepreload) vào file HTML đầu ra
    modulePreload: {
      polyfill: false, // Tắt nếu không cần hỗ trợ các trình duyệt quá cũ, giúp tối ưu dung lượng
    },
    rollupOptions: {
      output: {
        // Gom nhóm và tối ưu hóa cách sinh asset
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"; // Tách riêng thư viện bên thứ 3 để tối ưu hóa bộ nhớ đệm
          }
        },
      },
    },
  },
});
