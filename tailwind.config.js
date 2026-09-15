module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Archivo Black"', 'sans-serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        background: '#000000',
        surface: '#000000',
        accent: '#e0e0e0',
      }
    },
  },
  plugins: [],
}