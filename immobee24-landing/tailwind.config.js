/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1200px',
      },
    },
    extend: {
      colors: {
        // Primary - Golden/Honey tones
        golden: {
          DEFAULT: '#F5A623',
          light: '#FFD700',
          dark: '#E09100',
        },
        // Secondary - Neutrals
        cream: '#FFFDF7',
        // Accents - Text colors
        charcoal: '#1A1A1A',
        slate: '#4A4A4A',
        'warm-gray': '#888888',
        // Success
        'honey-green': '#34C759',
        // Legacy support
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#F5A623',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#FFFFFF',
          foreground: '#1A1A1A',
        },
        accent: {
          DEFAULT: '#F5A623',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#F5F5F5',
          foreground: '#888888',
        },
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        // metric previously used DM Sans; consolidated to Inter (two-family
        // font budget — see src/main.tsx).
        metric: ['Inter', 'sans-serif'],
      },
      fontSize: {
        // Custom scale
        'hero': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'hero-mobile': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'section': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'section-mobile': ['2rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],
        'subhead': ['1.5rem', { lineHeight: '1.4', fontWeight: '500' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7', fontWeight: '400' }],
        'metric': ['3rem', { lineHeight: '1', fontWeight: '700' }],
        'metric-mobile': ['2.25rem', { lineHeight: '1', fontWeight: '700' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 8px 32px rgba(245, 166, 35, 0.15)',
        'golden': '0 4px 20px rgba(245, 166, 35, 0.35)',
        'subtle': '0 2px 12px rgba(0, 0, 0, 0.04)',
      },
      backgroundImage: {
        'gradient-golden': 'linear-gradient(135deg, #FFD700 0%, #F5A623 50%, #E09100 100%)',
        'gradient-golden-soft': 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(245, 166, 35, 0.05) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
