/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ludo: {
          dark: '#051f17',
          emerald: '#0c4a38',
          teal: '#105c47',
          gold: '#fbbf24',
          accent: '#10b981',
          lightBg: '#d1fae5',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
