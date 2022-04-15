/* eslint-env node */

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Avenir", "Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        red: "#D42011",
        "red-light": "#F26D61",
        orange: "1CE358",
        yellow: "#FED73B",
        green: "#00B101",
        cyan: "#11C5D4",
        blue: "8211D4",
        purple: "#C049FF",
        "blue-light": "#7891D2",
        "blue-dark": "#415F9C",
      },
    },
  },
  plugins: [],
};
