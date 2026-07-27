import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,ts,tsx}", "./preview/index.html"],
  theme: {
    extend: {
      // Tokens shadcn/ui — a fonte de verdade está nas CSS variables (index.css)
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // Escalas gráficas da marca — para direção de arte (heros, texturas,
        // marquees); os componentes usam os tokens acima.
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
        gold: {
          300: "#ffdd66",
          400: "#ffd23f",
          500: "#ffc72c",
          600: "#e6ad00",
        },
        ink: {
          900: "#141114",
          950: "#0c0a0c",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "var(--radius)",
        sm: "var(--radius)",
      },
      fontFamily: {
        // Uma só família para todo o site: Overused Grotesk.
        // "display" = mesma família em Black (peso reforçado em index.css).
        display: ["Overused Grotesk", "system-ui", "sans-serif"],
        sans: ["Overused Grotesk", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        wider2: "0.18em",
      },
      maxWidth: {
        site: "80rem",
      },
    },
  },
  plugins: [animate],
};
