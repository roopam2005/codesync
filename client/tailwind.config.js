/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // ==================== FONTS ====================
      fontFamily: {
        vt: ['VT323', 'monospace'],
        roboto: ['"Roboto Condensed"', 'sans-serif'],
        sans: ['VT323', 'monospace'],
      },

      // ==================== COLORS ====================
      colors: {
        // Base
        base: {
          DEFAULT: '#050505',
          surface: '#0d0d12',
          card: '#12121a',
          border: '#1e1e2e',
        },
        // Aurora palette
        aurora: {
          purple: '#a855f7',
          magenta: '#ec4899',
          orange: '#f97316',
          cyan: '#06b6d4',
          teal: '#14b8a6',
        },
        // Text
        text: {
          primary: '#ffffff',
          secondary: '#a1a1aa',
          muted: '#52525b',
        },
      },

      // ==================== ANIMATIONS ====================
      animation: {
        'aurora-move': 'aurora 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        aurora: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(50px, 30px) rotate(180deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },

      // ==================== BACKGROUND ====================
      backgroundImage: {
        'aurora-gradient': 'linear-gradient(135deg, #a855f7, #ec4899, #f97316, #06b6d4)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
      },

      // ==================== BLUR ====================
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};