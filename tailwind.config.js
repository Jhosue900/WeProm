/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        weprom: {
          red: '#FF3B30',
          blue: '#007AFF',
          green: '#34C759',
          yellow: '#FF9500',
          purple: '#AF52DE',
          teal: '#5AC8FA',
          light: '#FFFFFF',
          'light-gray': '#F9FAFB',
          'light-bg': '#F8F9FA',
          dark: '#0A0A0A',
          'dark-gray': '#1C1C1E',
          black: '#000000',
          white: '#FFFFFF',
          gray: {
            50: '#F8F9FA', 100: '#F1F3F5', 200: '#E9ECEF', 300: '#DEE2E6',
            400: '#CED4DA', 500: '#ADB5BD', 600: '#6C757D', 700: '#495057',
            800: '#343A40', 900: '#212529',
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
        'gradient-light': 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
        'gradient-light-red': 'linear-gradient(135deg, #FFF5F5 0%, #FFE5E5 100%)',
        'gradient-light-blue': 'linear-gradient(135deg, #F0F7FF 0%, #E6F2FF 100%)',
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
        'slow-bounce': 'soft-bounce 2s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
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
        'soft-bounce': {
          '0%, 100%': {
            transform: 'translateY(-8%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
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
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'weprom': '0 4px 14px 0 rgba(255, 59, 48, 0.2)',
        'weprom-lg': '0 10px 40px 0 rgba(255, 59, 48, 0.3)',
        'light': '0 4px 20px 0 rgba(0, 0, 0, 0.08)',
        'light-lg': '0 10px 40px 0 rgba(0, 0, 0, 0.12)',
        'card': '0 2px 12px 0 rgba(0, 0, 0, 0.05)',
        'whatsapp': '0 10px 25px -5px rgba(37, 211, 102, 0.4)',
      }
    },
  },
  plugins: [],
};