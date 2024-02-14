/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      bluePurple: "#7848F4",
      white: "#ffffff",
      mercury: "#E5E5E5",
      magentaRed: "#E41076",
      violetBlue: "#4E26B8",
      black: "#000000",
    },
    fontFamily: {
      sarala: ["Sarala", "sans-serif"],
      spyRice: ["Spicy Rice", "serif"],
      satisfy: ["Satisfy", "cursive"],
      singleDay: ["Single Day", "cursive"],
    },
    backgroundImage: {
      mainBg: "url('/src/assets/images/bgEventio.jpg')",
    },
  },
  plugins: [],
};
