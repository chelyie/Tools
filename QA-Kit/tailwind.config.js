module.exports = {
  prefix: 'tw_',
  darkMode: 'media', // or 'class' if you toggle themes manually
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html',
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          50: '#FFF6F9',   // page background
          100: '#FDE3ED',  // soft fills / icon bg / nav pill bg
          200: '#FBD0E2',  // preview frame background
          400: '#F5A0C4',  // borders / dashed upload outlines
          600: '#E4679E',  // primary buttons / active nav pill
          700: '#CF4B85',  // headings accent / links / eyebrow text
          950: '#241820',  // dark-mode page background
          900: '#331F2B',  // dark-mode card background
        },
        ink: {
          DEFAULT: '#3B2836',
          soft: '#8A7481',
          light: '#FBEAF1',   // dark-mode body text
          lightsoft: '#C9AAB9', // dark-mode muted text
        },
        border: {
          DEFAULT: '#F2D6E3',
          dark: '#4A2C3B',
        },
      },
    },
  },
  plugins: [],
};