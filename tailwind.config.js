/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./src/presentation/components/**/*.{js,jsx,ts,tsx}",
    "./src/presentation/views/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        yellow: '#faba06',
        moonstone: '#40A8BE',
        cadet: '#34384d',
        dark: '#030303',
        eerie: '#1d1d20',
        silver: '#ababab',
        salt: '#f8f8f8',
        timberwolf: '#D6D6D6',
        saltligth: '#FBFAF6',
        davygray: '#5C5C5C',
        danger: '#F8285B',
        orange: '#E95A23',
        blue: '#1C6A90',
        darkligth: '#25262A',
        primary: '#faba06',
      },
      fontFamily: {
        monaLight: ['MonaSans-Light'],
        mona: ['MonaSans-Regular'],
        monaExtraBold: ['MonaSans-ExtraBold'],
        monaBold: ['MonaSans-Bold'],
        monaMedium: ['MonaSans-Medium'],
        monaSemi: ['MonaSans-SemiBold'],
      },
      minHeight: {
        300: '300px',
        350: '350px',
        400: '400px',
        450: '450px',
        500: '500px',
      },
    },
  },
  plugins: [],
}