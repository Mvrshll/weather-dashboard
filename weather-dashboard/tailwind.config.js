/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin-slow 8s linear infinite',
        'fall': 'fall 2s ease-in-out infinite',
        'flash': 'flash 1s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

