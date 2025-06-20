/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        rosa: "#F065AF",
        celeste: "#BBE2F8",
        "azul-claro": "#E4F7FE",
        azul: "#0E9FE5",
        // colores ligados - profesionales
        celeste_otec: "#e5f6fe",
        azul_oscuro: "#1D61AD",
        azul_suave: "#A5C8F2",
        naranja_suave: "#F2A541	",
        azul_base: "#428CE2",
        azul_oscuro2: "#2F3E4D",
        gris_claro: "#F4F6F8",
        gris_medio: "#8B9AA7",
        verde_suave: "#5DC288",
      },
      height: {
        dvh: "100dvh",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
