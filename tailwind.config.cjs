/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      spartan: ['Spartan', 'sans-serif']
    },
    fontSize: {
      sm: ['.75rem', '0.9375rem'], // 12px / 15px
      lg: ['1rem', '1.5rem'], // 16px / 24px
      xl: ['1.25rem', '1.375rem'], // 20px / 22px
      '2xl': ['2rem', '2.5rem'], // 32px / 36px
      'body-1': ['0.75rem', '0.9375rem'], // 12px / 15px
      'body-2': ['0.6875rem', '1.125rem'] // 11px / 18px
    },
    letterSpacing: {
      tightest: '-0.0625rem', // -1px
      tighter: '-0.05rem', // -0.8px
      tight: '-0.0395rem', // -0.6px
      normal: '-0.0165rem' // -0.25px
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
        offWhite: '#F8F8F8'
      },
      borderWidth: {
        1: '1px'
      },
      height: {
        18: '72px'
      },
      padding: {
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
