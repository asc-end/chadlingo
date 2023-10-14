/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./flows/*/*.{js,jsx,ts,tsx}", "./components/*.{js,jsx,ts,tsx}", "./components/solana/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'dark-indigo': '#4B30A2',
        "dark-turquoise": "#00FFFF",
        'pastel-green': "#51FF51"
      },
    },
  },
  plugins: [],
};
