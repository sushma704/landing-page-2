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
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // ── Brand tokens per the marketing-site brief (§02) ──
        // Neutrals are CSS variables (RGB triplets in src/index.css) so the
        // whole site flips to dark mode from one place; utilities keep their
        // opacity modifiers (e.g. text-charcoal/70) via <alpha-value>.
        golden: {
          DEFAULT: '#F5A623', // signal amber — wordmark "24"
          light: '#FFD700',
          dark: '#C76C05', // deep amber — CTA/emphasis (brief token)
        },
        'amber-deep': '#C76C05',
        teal: {
          DEFAULT: 'rgb(var(--c-teal) / <alpha-value>)', // wordmark "immob"
          ink: 'rgb(var(--c-teal-ink) / <alpha-value>)',
          wash: 'rgb(var(--c-teal-wash) / <alpha-value>)',
        },
        cream: 'rgb(var(--c-cream) / <alpha-value>)',
        charcoal: 'rgb(var(--c-ink) / <alpha-value>)',
        slate: 'rgb(var(--c-ink-soft) / <alpha-value>)',
        'warm-gray': 'rgb(var(--c-ink-faint) / <alpha-value>)',
        white: 'rgb(var(--c-surface) / <alpha-value>)',
        // Health scale (brief): good / warn / crit
        'honey-green': '#2F9A72',
        'health-warn': '#D9922B',
        'health-crit': '#D9544B',
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
          DEFAULT: 'rgb(var(--c-muted) / <alpha-value>)',
          foreground: 'rgb(var(--c-ink-faint) / <alpha-value>)',
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
        // Dark-only theme: black drop shadows are invisible on near-black —
        // cards get a hairline ring + soft amber glow instead (Part A.3).
        'card': '0 0 0 1px rgba(245, 240, 230, 0.05), 0 0 24px rgba(245, 166, 35, 0.07)',
        'card-hover': '0 0 0 1px rgba(245, 166, 35, 0.25), 0 8px 32px rgba(245, 166, 35, 0.12)',
        'golden': '0 4px 24px rgba(245, 166, 35, 0.30)',
        'subtle': '0 0 0 1px rgba(245, 240, 230, 0.04)',
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
