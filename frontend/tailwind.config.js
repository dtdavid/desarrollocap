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
        "azul-oscuro": "#1D61AD",
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
