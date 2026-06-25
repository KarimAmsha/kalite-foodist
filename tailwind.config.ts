import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        kalite: {
          // Brand palette from the implementation brief
          red: '#A52332',
          'red-deep': '#7E1623',
          brown: '#4A2312',
          ink: '#2A1810', // headings / strong text
          cream: '#FFF7EA',
          'cream-deep': '#F6EAD6',
          gold: '#C89A3C',
          'gold-soft': '#E4C98A',
        },
      },
      fontFamily: {
        sans: ['var(--font-latin)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'var(--font-latin)', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(74, 35, 18, 0.25)',
        card: '0 8px 30px -12px rgba(74, 35, 18, 0.16)',
        glow: '0 0 0 1px rgba(200, 154, 60, 0.25), 0 22px 60px -20px rgba(165, 35, 50, 0.35)',
        ring: '0 0 0 1px rgba(74, 35, 18, 0.08)',
      },
      backgroundImage: {
        'cream-radial':
          'radial-gradient(1100px 560px at 82% -8%, rgba(200,154,60,0.14), transparent), radial-gradient(900px 520px at -8% 12%, rgba(165,35,50,0.07), transparent)',
        'gold-line': 'linear-gradient(90deg, transparent, rgba(200,154,60,0.85), transparent)',
        'red-sheen': 'linear-gradient(135deg, #A52332 0%, #7E1623 100%)',
        'brown-sheen': 'linear-gradient(135deg, #4A2312 0%, #2A1810 100%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease-out both',
        marquee: 'marquee 26s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
