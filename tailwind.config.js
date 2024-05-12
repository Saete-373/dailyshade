/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "base-pink": "#EFC7C2",
        "bg-peach": "#FFE5D4",
        "pink-darker": "#d38f87",
        "text-color": "#2F0601",
        "ins-color": "#d6249f",
        "wheat-color": "#EFEDEC",
      },
    },
  },
  plugins: [],
};
