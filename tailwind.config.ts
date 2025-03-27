import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores principales basados en el diseño de Pharma Summit
        primary: {
          DEFAULT: "#0066B3", // Azul Nestlé
          light: "#3399FF",
          dark: "#004C8C",
        },
        secondary: {
          DEFAULT: "#00A0DC", // Azul claro para acentos
          light: "#33B5E5",
          dark: "#0085B3",
        },
        accent: {
          DEFAULT: "#E31837", // Rojo Nestlé
          light: "#FF4D6D",
          dark: "#CC1630",
        },
        background: {
          DEFAULT: "#F0F7FF", // Fondo azul muy claro
          paper: "#FFFFFF",
          gradient: "linear-gradient(135deg, #0066B3 0%, #00A0DC 100%)",
        },
        bubble: {
          DEFAULT: "#33B5E5",
          light: "#66C9FF",
          dark: "#0099CC",
        },
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "fade-in": "fade-in 0.5s ease-in-out",
        "slide-up": "slide-up 0.5s ease-out",
        "slide-down": "slide-down 0.5s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "scale-out": "scale-out 0.2s ease-in",
        "bounce-soft": "bounce-soft 2s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
      },
      keyframes: {
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "pulse-soft": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "scale-out": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0.95)", opacity: "0" },
        },
      },
      boxShadow: {
        "bubble": "0 4px 14px rgba(51, 181, 229, 0.4)",
        "bubble-hover": "0 6px 20px rgba(51, 181, 229, 0.6)",
        "card": "0 4px 14px rgba(0, 102, 179, 0.1)",
        "card-hover": "0 6px 20px rgba(0, 102, 179, 0.2)",
      },
      borderRadius: {
        "bubble": "50%",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-primary": "linear-gradient(135deg, #0066B3 0%, #00A0DC 100%)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
};

export default config; 