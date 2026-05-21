/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        scholastic: {
          bg: '#F9FAFB',
          navy: '#1E3A8A',
          sakura: '#F472B6',
          matcha: '#10B981',
          muted: '#64748B',
          glass: 'rgba(255, 255, 255, 0.7)'
        }
      },
      fontFamily: {
        sans: ['Be Vietnam Pro', 'Inter', 'sans-serif'],
        display: ['Be Vietnam Pro', 'Outfit', 'sans-serif'],
        jp: ['Noto Sans JP', 'sans-serif']
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'premium': '0 10px 30px -5px rgba(30, 58, 138, 0.1)'
      }
    },
  },
  plugins: [],
}
