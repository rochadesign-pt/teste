/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Bordô — cor principal do clube
        bordeaux: {
          50: "#fdf2f4",
          100: "#fbe3e7",
          200: "#f6ccd3",
          300: "#efa3b0",
          400: "#e57187",
          500: "#d64560",
          600: "#b52a48",
          700: "#941f3a",
          800: "#7a1d35",
          900: "#5c0e1e",
          950: "#3d0813",
        },
        // Amarelo / dourado — cor de destaque
        gold: {
          300: "#ffdd66",
          400: "#ffd23f",
          500: "#ffc72c",
          600: "#e6ad00",
        },
        // Preto profundo para fundos
        ink: {
          900: "#141114",
          950: "#0c0a0c",
        },
      },
      fontFamily: {
        display: ["Anton", "Impact", "sans-serif"],
        sans: ["Archivo", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        wider2: "0.18em",
      },
      maxWidth: {
        site: "80rem",
      },
    },
  },
  plugins: [],
};
