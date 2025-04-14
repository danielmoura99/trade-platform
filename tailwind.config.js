/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Cores do tema atual
        background: "#121212",
        surface: "#1E1E1E",
        surfaceHover: "#2A2A2A",
        border: "#333",
        text: "#E1E1E1",
        textSecondary: "#AAA",
        primary: "#26A69A", // verde para positivo/compra
        danger: "#EF5350", // vermelho para negativo/venda
      },
    },
  },
  plugins: [],
};
