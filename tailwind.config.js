/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ['./src/renderer/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}', './src/*.{js,jsx,ts,tsx}'],
  theme: {
    extend:{
      fontFamily:{
        sans: ['Poppins',...defaultTheme.fontFamily.sans],
        robotoMono: ['Roboto Mono', 'monospace'],
      },
      colors:{
        primary: '#012030',
        secondary: '#13678A',
        blue: '#13678A',
        'gray-150': '#F5F5F5',
        'gray-250': '#EAEAEA',
      }
    }
  },
  variants: {},
  plugins: [],
};

