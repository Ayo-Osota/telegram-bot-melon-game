/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Urbanist", ...defaultTheme.fontFamily.serif],
      },
      colors: {
        green: '#119D07F2',
        gray: '#33333380'
      },
      spacing: {
        '11.5': '2.875rem',
        '15': '3.75rem'
      }
    },
  },
  plugins: [],
}

