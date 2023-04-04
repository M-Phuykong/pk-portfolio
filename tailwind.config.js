/** @type {import('tailwindcss').Config} */
module.exports = {
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
    extend: {},
  },
  plugins: [],
}

