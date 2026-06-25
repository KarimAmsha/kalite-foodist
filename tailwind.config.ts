import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        kalite: {
          // Brand palette from the implementation brief
          red: '#A52332',
          brown: '#4A2312',
          cream: '#FFF7EA',
          gold: '#C89A3C',
        },
      },
      fontFamily: {
        sans: ['var(--font-latin)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'var(--font-latin)', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(74, 35, 18, 0.25)',
        card: '0 8px 30px -10px rgba(74, 35, 18, 0.18)',
        glow: '0 0 0 1px rgba(200, 154, 60, 0.25), 0 18px 50px -16px rgba(165, 35, 50, 0.35)',
      },
      backgroundImage: {
        'cream-radial':
          'radial-gradient(1200px 600px at 80% -10%, rgba(200,154,60,0.12), transparent), radial-gradient(900px 500px at -10% 20%, rgba(165,35,50,0.08), transparent)',
        'gold-line':
          'linear-gradient(90deg, transparent, rgba(200,154,60,0.8), transparent)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
