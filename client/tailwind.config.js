/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(45deg, rgba(0,0,0,1) 22%, rgba(102,30,1,1) 100%, rgba(0,212,255,1) 100%)',
      },
      keyframes: {
        confetti: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        rotate: {
          '0%': { transform: 'rotate(0)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        confetti: 'confetti 4s ease-in forwards',
        rotate: 'rotate 2s linear infinite',
      },
    },
  },
  plugins: [],
}

