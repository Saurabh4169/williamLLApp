/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3D4D7C',
          hover: '#313E64',
          light: '#EBEFF7',
        },
        ink: {
          DEFAULT: '#1F2A44',
          light: '#2E3D60',
        },
        background: '#F2F3F5',
        surface: {
          DEFAULT: '#F8F9FB',
          card: '#F8F9FB',
          glass: 'rgba(255, 255, 255, 0.75)',
        },
        border: {
          DEFAULT: '#DDE2EA',
          light: '#EEF1F6',
        },
        muted: {
          DEFAULT: '#8A93A6',
          dark: '#6A748A',
        },
        gradient: {
          start: '#B7C3DA',
          end: '#7D90B5',
        },
        success: {
          DEFAULT: '#3FA66B',
          bg: '#EAF6F0',
        },
        danger: {
          DEFAULT: '#E5484D',
          bg: '#FDF0F0',
        },
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
      },
      borderRadius: {
        'card': '24px',
        'card-lg': '28px',
        'card-sm': '18px',
        'pill': '9999px',
      },
      boxShadow: {
        'glass': '0 8px 30px rgba(31, 42, 68, 0.08)',
        'glass-hover': '0 12px 36px rgba(31, 42, 68, 0.12)',
        'glass-active': '0 4px 16px rgba(31, 42, 68, 0.10)',
        'floating-nav': '0 10px 40px -10px rgba(31, 42, 68, 0.18)',
        'btn-highlight': 'inset 0 1px 0 rgba(255, 255, 255, 0.25)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(180deg, #B7C3DA 0%, #7D90B5 100%)',
        'brand-gradient-horizontal': 'linear-gradient(90deg, #B7C3DA 0%, #7D90B5 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(248,249,251,0.65) 100%)',
      }
    },
  },
  plugins: [],
}

