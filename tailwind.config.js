/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          green: '#1b4d3e',
          lightgreen: '#256d3b',
          emerald: '#10b981',
          gold: '#eab308',
          accent: '#f59e0b',
          bg: '#f4f7f5',
          card: '#ffffff',
          dark: '#0e2920',
        }
      }
    },
  },
  plugins: [],
}
