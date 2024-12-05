/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        '14': '14px', // Add a custom value for border radius
      },
      colors: {
      },
    },
  },
  plugins: [],
}