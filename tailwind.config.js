/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily:{
        atkinson: "Atkinson Hyperlegible Next"
      },
      colors:{
        colorOne: "#00838F",
        colorTwo: "#8D9797",
        colorThree: "#E5E8E8",
        colorFour: "#1d232a"
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}