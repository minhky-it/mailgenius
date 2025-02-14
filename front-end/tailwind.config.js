module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        georgiaFont: ['Georgia'],
        helveticeFont: ['Helvetica'],
        cursiveFont: ['cursive'],
        geistFont: ['"Geist"'],
        calistogaFont: ['"Calistoga"'],
        GraphikFont: ['"Graphik"'],
        Means: ['"Means Web"'],
      },
    },
  },
  plugins: [
    require('tailwindcss-motion')
  ],
}