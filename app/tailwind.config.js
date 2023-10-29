const nativewind = require("nativewind/tailwind/css")

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/App.{js,jsx,ts,tsx}", "./src/flows/**/*.{js,jsx,ts,tsx,css}", "./src/components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "neon-blue": "#0500FE",
        "dark-indigo": "#4B30A2",
        "dark-turquoise": "#00FFFF",
        "pastel-green": "#51FF51",
      },
    },
    fontFamily:{
      "clock": "Consolas"
    }
  },
  plugins: [require('nativewind/tailwind/css')],
};
