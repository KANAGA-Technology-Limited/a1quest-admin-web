/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [],
  content: ["./src/**/*.{js,jsx,ts,tsx,html}", "./public/index.html"],

  theme: {
    extend: {
      textColor: {
        primary: '#0057FF',
        success: '#008000',
        secondary: '#F48120',
        error: "#FF0000"
      },
      backgroundColor: {
        primary: '#0057FF',
        primaryDark: '#042E4A',
        error: '#FF0000',
        grey: "#DEDCDC"
      },
      borderColor: {
        primary: '#8D8282',
      },
      fontFamily: {
        primary: "Inter, sans-serif",
      },
      padding: {
        primary: '5vw',
      },
      minHeight: {
        main: 'calc(100vh - 80px)',
      },
      height: {
        main: 'calc(100vh - 80px)',
      },
    },
  },
};
