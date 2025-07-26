/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        [`base`]: 'rgb(var(--base) / <alpha-value>)',
        [`basef`]: 'rgb(var(--basef) / <alpha-value>)',
        [`base2`]: 'rgb(var(--base2) / <alpha-value>)',
        [`base2f`]: 'rgb(var(--base2f) / <alpha-value>)',
        [`accent`]: 'rgb(var(--accent) / <alpha-value>)',
        [`accentf`]: 'rgb(var(--accentf) / <alpha-value>)',
      },
    },
  },
  plugins: [
    ({ addBase }) => {
      return addBase({
        ':root': {
          '--base': '255, 255, 255',
          '--basef': '0, 0, 0',
          '--base2': '238, 238, 238',
          '--base2f': '0, 0, 0',
          '--accent': '233, 30, 99',
          '--accentf': '0, 0, 0',
        },
      });
    },
  ],
};
