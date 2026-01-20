/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nordic: {
          charcoal: '#121212',
          black: '#0A0A0A',
          teal: '#2DD4BF',
          indigo: '#6366F1',
          slate: '#1E293B',
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
