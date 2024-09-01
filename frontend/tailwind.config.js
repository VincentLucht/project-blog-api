/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.center-vertical': {
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
        },
        '.df': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        '.h2': {
          fontSize: '2rem',
          fontWeight: 'bold',
        },
        '.nav-button': {
          border: '1px solid',
          padding: '4px 8px',
        },
        '.login-input': {
          width: 'clamp(200px, 30vw, 300px)',
          padding: '4px 8px',
        },
        '.clamp-sm': {
          width: 'clamp(300px, 30vw, 400px)',
        },
        '.calc-h-vw': {
          height: 'calc(100vh - 64px)',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
