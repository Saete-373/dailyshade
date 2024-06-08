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
        "midnight": "#101720",
      },
      screens: {
        'ssm' : {'max': '480px'},
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
        'min-ipad': {'min': '1025px'},
        'ipad': {'max': '1024px'},
        'ipad-mini': {'max': '720px'},
        'max-lg' : `@media not all and (min-width: 1024px) { ... }`,
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'spin-fast': 'spin 10s linear infinite',
        'shake' : 'animation: shake 3s infinite',
      }
    },
  },
  plugins: [],
};
