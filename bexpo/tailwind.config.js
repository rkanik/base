/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        [`base`]: 'rgb(var(--color-base) / <alpha-value>)',
        [`basef`]: 'rgb(var(--color-basef) / <alpha-value>)',
      },
    },
  },
  plugins: [
    ({ addBase }) => {
      return addBase({
        ':root': {
          '--color-base': '255, 255, 255',
          '--color-basef': '0, 0, 0',
        },
      });
    },
  ],
};
