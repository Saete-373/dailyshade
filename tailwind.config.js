/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}',
],
  theme: {
    extend: {colors: {
      'base-pink': '#EFC7C2',
      'pink-darker':'#d38f87',
      'text-color':'#2F0601',
      'ins-color' : '#d6249f'
    },
    },
    animation: {
      "fade-in": "fadeIn 0.15s ease-in-out"
    },
    keyframes: () => ({
      fadeIn: {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 }
      }
    }),
    
  },
  plugins: [],
};