/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#001871", // Dark navy blue for billnov
        accent: "#00C1D4", // Turquoise accent color
      },
    },
  },
  plugins: [],
};
