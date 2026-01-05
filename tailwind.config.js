/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      colors: {
        'wedding-cream': '#f9f7f2', // Base paper color
        'wedding-gold': '#c5a059',  // Accent gold
        'wedding-olive': '#5c6b50', // Greenery accent
      },
    },
  },
  plugins: [],
}
