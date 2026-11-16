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
          DEFAULT: '#323232', // Primary Charcoal
          dark: '#191919',    // Deep Black
          hover: '#222222',
          light: '#F4F5F5',
        },
        charcoal: {
          DEFAULT: '#323232',
          deep: '#191919',
          light: '#4A4A4A',
        },
        misty: {
          highlight: '#C7D3DC',
          light: '#A5B5C1',
          DEFAULT: '#A3B4C0',
          deep: '#A0B0BC',
          shadow: '#899EAE',
          dark: '#899EAE',
        },
        ice: {
          DEFAULT: '#C0D0E1', // Ice Blue
          light: '#E2EAF2',
          dark: '#A6BCCD',
        },
        softgrey: {
          DEFAULT: '#D8D8D8', // Soft Grey
          light: '#ECECEC',
          dark: '#C0C0C0',
        },
        purewhite: '#FEFEFE',
        ink: {
          DEFAULT: '#191919',
          light: '#323232',
        },
        background: '#F4F5F5',
        surface: {
          DEFAULT: '#FEFEFE',
          card: 'rgba(254, 254, 254, 0.88)',
          glass: 'rgba(254, 254, 254, 0.75)',
        },
        border: {
          DEFAULT: '#D8D8D8',
          silver: '#C0D0E1',
          light: '#E6EAEF',
        },
        muted: {
          DEFAULT: '#71717A',
          dark: '#52525B',
          misty: '#8C9DAA',
        },
        gradient: {
          start: '#323232',
          end: '#191919',
        },
        success: {
          DEFAULT: '#22C55E',
          bg: '#EAF6F0',
        },
        warning: {
          DEFAULT: '#F59E0B',
          bg: '#FEF3C7',
        },
        danger: {
          DEFAULT: '#EF4444',
          bg: '#FEE2E2',
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
        'glass': '0 8px 30px rgba(25, 25, 25, 0.04)',
        'glass-hover': '0 12px 36px rgba(25, 25, 25, 0.07)',
        'glass-active': '0 4px 16px rgba(25, 25, 25, 0.06)',
        'floating-nav': '0 10px 40px -10px rgba(25, 25, 25, 0.20)',
        'btn-highlight': 'inset 0 1px 0 rgba(255, 255, 255, 0.25)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(180deg, #FEFEFE 0%, #F4F5F5 100%)',
        'brand-gradient-horizontal': 'linear-gradient(90deg, #FEFEFE 0%, #F4F5F5 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(254,254,254,0.95) 0%, rgba(244,248,252,0.80) 100%)',
        'misty-gradient': 'linear-gradient(135deg, #C7D3DC 0%, #A5B5C1 30%, #A3B4C0 60%, #A0B0BC 85%, #899EAE 100%)',
        'misty-water': 'linear-gradient(180deg, #C7D3DC 0%, #A5B5C1 35%, #A3B4C0 70%, #899EAE 100%)',
        'misty-glass': 'linear-gradient(135deg, rgba(199, 211, 220, 0.40) 0%, rgba(165, 181, 193, 0.22) 50%, rgba(137, 158, 174, 0.18) 100%)',
      }
    },
  },
  plugins: [],
}

