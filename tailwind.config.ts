import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        kalite: {
          // Brand reds
          red: '#A52332',
          'red-deep': '#7E1623',
          'red-bright': '#E23B4E', // accent on dark surfaces
          // Browns / night base
          brown: '#4A2312',
          ink: '#2A1810',
          night: '#160C07', // page background
          'night-2': '#1E120B', // raised surface
          'night-3': '#271710', // cards
          // Creams / text
          cream: '#F6ECDD',
          'cream-deep': '#E7D6BE',
          // Gold accents
          gold: '#C89A3C',
          'gold-soft': '#E4C98A',
          'gold-bright': '#EBC974',
        },
      },
      fontFamily: {
        sans: ['var(--font-latin)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'var(--font-latin)', 'sans-serif'],
      },
      letterSpacing: { tightest: '-0.04em' },
      boxShadow: {
        soft: '0 18px 50px -18px rgba(0,0,0,0.6)',
        card: '0 16px 50px -20px rgba(0,0,0,0.7)',
        glow: '0 0 0 1px rgba(200,154,60,0.25), 0 30px 80px -28px rgba(165,35,50,0.45)',
        'gold-glow': '0 0 0 1px rgba(200,154,60,0.35), 0 20px 60px -24px rgba(200,154,60,0.4)',
      },
      backgroundImage: {
        'night-radial':
          'radial-gradient(1100px 580px at 80% -10%, rgba(200,154,60,0.16), transparent), radial-gradient(900px 540px at -8% 8%, rgba(165,35,50,0.16), transparent)',
        'gold-line': 'linear-gradient(90deg, transparent, rgba(200,154,60,0.85), transparent)',
        'gold-sheen': 'linear-gradient(135deg, #E4C98A 0%, #C89A3C 45%, #9A7322 100%)',
        'red-sheen': 'linear-gradient(135deg, #E23B4E 0%, #A52332 55%, #7E1623 100%)',
        'glass-sheen':
          'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        'fade-up': { '0%': { opacity: '0', transform: 'translateY(18px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease-out both',
        shimmer: 'shimmer 6s linear infinite',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
