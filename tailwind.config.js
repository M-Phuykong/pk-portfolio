/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
    content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontSize: {
      sm: '16px',
      base: '18px',
      lg: '20px',
      xl: '24px',
      '2xl': '30px',
      '3xl': '36px',
      '4xl': '48px',
      '5xl': '60px',
    },
    fontFamily: {
      "sans": ["Roboto Mono", "Poppins", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      animation: {
        handwave: 'handwave 2.5s infinite',
      },
      keyframes: {
        handwave:{
          '0%': { transform: 'rotate(0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10deg)' },
          '60%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(0deg)' }
        },

      }
    },
  },
  plugins: [
    require('tailwind-bootstrap-grid')({
        containerMaxWidths: { sm: '540px', md: '720px', lg: '960px', xl: '1140px' },
      }),
  ],
}

