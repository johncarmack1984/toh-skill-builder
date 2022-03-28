module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Avenir', 'Helvetica', 'Arial', 'sans-serif']
      },
      colors: {
        'red': '#D42011',
        'yellow': '#FED73B',
        'green': '#00B101',
        'purple': '#C049FF',
        'blue-light': '#7891D2',
        'blue-dark': '#415F9C',
      },      
    },
  },
  plugins: [],
}