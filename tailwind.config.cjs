/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      spartan: ['Spartan', 'sans-serif']
    },
    extend: {
      colors: {
        violet: '#7c5dfa',
        'violet-light': '#9277FF',
        veryDarkBlue: '#1E2139',
        darkBlue: '#252945',
        veryDarkGrayishBlue: '#373B53',
        lavender: '#DFE3FA',
        coolGrey: '#888EB0',
        grayishBlue: '#7E88C3',
        red: '#EC5757',
        'red-light': 'rgba(255, 151, 151)',
        black: '#0C0E16',
        'earie-black': '#141625',
        white: '#F8F8F8'
      },
      borderWidth: {
        1: '1px'
      },
      height: {
        18: '72px'
      },
      width: {
        18: '72px'
      },
      zIndex: {
        modal: 999,
        overlay: 998,
        aside: 400,
        logo: 12,
        logoBg: 11
      }
    }
  },
  plugins: []
};
