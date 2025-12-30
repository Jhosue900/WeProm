/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        weprom: {
          // Colores principales (más vibrantes)
          red: '#FF3B30',
          blue: '#007AFF',
          green: '#34C759',
          yellow: '#FF9500',
          
          // Colores secundarios (para acentos)
          purple: '#AF52DE',
          teal: '#5AC8FA',
          
          // Colores oscuros (para fondos)
          dark: '#0A0A0A',
          'dark-gray': '#1C1C1E',
          
          // Colores claros
          'light-gray': '#F2F2F7',
          
          // Colores neutros
          black: '#000000',
          white: '#FFFFFF',
          gray: {
            50: '#F5F5F5',
            100: '#E5E5E5',
            200: '#D1D1D6',
            300: '#C7C7CC',
            400: '#AEAEB2',
            500: '#8E8E93',
            600: '#636366',
            700: '#48484A',
            800: '#3A3A3C',
            900: '#2C2C2E',
          }
        }
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'astonpoliz': ['Astonpoliz', 'cursive'],
        'sans': ['Montserrat', 'sans-serif'],
      },
      fontWeight: {
        'light': 300,
        'semibold': 600,
        'extrabold': 800,
      },
      letterSpacing: {
        'normal': '0pt',
        'wide': '1pt',
      },
      lineHeight: {
        'tight': '1.2',
        'relaxed': '1.5',
        'loose': '1.6',
      },
      backgroundImage: {
        // Gradientes mejorados
        'gradient-red': 'linear-gradient(135deg, #FF3B30 0%, #C5362E 100%)',
        'gradient-blue': 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
        'gradient-green': 'linear-gradient(135deg, #34C759 0%, #32D74B 100%)',
        'gradient-yellow': 'linear-gradient(135deg, #FF9500 0%, #FFCC00 100%)',
        'gradient-purple': 'linear-gradient(135deg, #AF52DE 0%, #BF5AF2 100%)',
        'gradient-teal': 'linear-gradient(135deg, #5AC8FA 0%, #64D2FF 100%)',
        'gradient-rainbow': 'linear-gradient(90deg, #FF3B30 0%, #FF9500 25%, #FFCC00 50%, #34C759 75%, #007AFF 100%)',
        'gradient-dark': 'linear-gradient(to bottom, #0A0A0A 0%, #1C1C1E 100%)',
      },
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'check': 'check 0.5s ease-in-out',
        'cart-bounce': 'cartBounce 0.8s ease',
        'vintage-fade': 'vintageFade 0.8s ease-out',
      },
      keyframes: {
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        check: {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
        cartBounce: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        vintageFade: {
          '0%': { opacity: '0', filter: 'grayscale(0)' },
          '100%': { opacity: '1', filter: 'grayscale(1)' },
        },
      },
      boxShadow: {
        'weprom': '0 4px 14px 0 rgba(255, 59, 48, 0.2)',
        'weprom-lg': '0 10px 40px 0 rgba(255, 59, 48, 0.3)',
      }
    },
  },
  plugins: [],
};