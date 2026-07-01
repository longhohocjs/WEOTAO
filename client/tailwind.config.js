/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Kích hoạt Dark Mode bằng class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Màu sắc đại diện cho ánh sáng thông minh theo nhịp sinh học
        circadian: {
          morning: '#FFB347',  *// Cam ấm bình minh*
          noon: '#4A90E2',     *// Xanh sáng ban trưa*
          evening: '#8B5FAA',  *// Tím dịu buổi tối*
        }
      }
    },
  },
  plugins: [],
}