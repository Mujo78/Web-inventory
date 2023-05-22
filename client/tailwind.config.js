/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      container: {
        center: true
      },
      outlineWidth: {
        "nones" : "0px"
      },
      fontFamily:{
        'Rubik': ['Rubik', 'sans-serif']
      },
      animation: {
        'slide-left': 'slide-left 1.5s  ease-out forwards',
        'slide-right': 'slide-right 1.5s ease-out forwards',
        'slide-back-left': 'slide-back-left 1.5s ease-out forwards',
        'slide-back-right': 'slide-back-right 1.5s ease-out forwards',
      },
      keyframes: {
        'slide-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-300%)' },
        },
        'slide-right': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(33%)' },
        },
        'slide-back-left': {
          '0%': { transform: 'translateX(-300%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-back-right': {
          '0%': { transform: 'translateX(33%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

