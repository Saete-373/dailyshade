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
    
  },
  plugins: [],
};