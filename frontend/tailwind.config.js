/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',      // Professional blue
        secondary: '#14b8a6',    // Elegant teal
        accent: '#10b981',       // Success green
        light: {
          100: '#f8fafc',
          200: '#f1f5f9',
          300: '#e2e8f0',
        },
      },
      fontFamily: {
        sans: ['Vazirmatn', 'sans-serif'],
      },
      boxShadow: {
        'elegant': '0 8px 32px rgba(0, 0, 0, 0.08)',
        'elegant-hover': '0 12px 40px rgba(59, 130, 246, 0.15)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.4s ease',
      },
    },
  },
  plugins: [],
}