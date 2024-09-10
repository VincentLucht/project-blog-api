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
        '.clamp-ss': {
          width: 'clamp(100px, 15vw, 300px)',
        },
        '.edit-textarea': {
          width: 'clamp(100px, 25vw, 350px)',
          borderRadius: '1.5rem',
          borderWidth: '2px',
          borderColor: 'transparent',
          paddingLeft: '1.25rem',
          paddingRight: '2.75rem',
          paddingTop: '0.75rem',
          paddingBottom: '0.75rem',
          '&:hover': {
            borderColor: 'white',
          },
          '&:focus': {
            borderColor: 'transparent',
          },
        },
        '.clamp-card': {
          width: 'clamp(400px, 40vw, 800px)',
        },
        '.calc-h-vw': {
          height: 'calc(100vh - 64px)',
        },
        '.calc-h-vw-1': {
          height: 'calc(100vh - 110px)',
        },
        '.box-shadow-br': {
          boxShadow: '10px 10px 2px 1px rgba(0, 0, 0, 0.15)',
          borderRadius: '10px',
        },
        '.grid-auto-fit': {
          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
