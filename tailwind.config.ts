import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0b1c3d',
          'navy-dark': '#071228',
          'navy-accent': '#174076',
          'navy-deep': '#1a375c',
          'navy-midnight': '#0b1538',
          blue: '#2f80ed',
          'blue-hover': '#5899f0',
          'blue-light': '#c9d8ee',
          'blue-badge': '#a1c5f6',
          slate: '#ebecef',
          'slate-hover': '#bcbcbf',
          input: '#f4f4f4',
          'input-border': '#ced1d8',
        },
      },
      fontFamily: {
        heading: ['var(--font-sora)', 'sans-serif'],
        sans: ['var(--font-ibm-plex)', 'sans-serif'],
        accent: ['var(--font-lobster)', 'cursive'],
      },
      maxWidth: {
        site: '1240px',
        content: '1224px',
      },
      boxShadow: {
        card: '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 8px 10px -6px rgba(0, 0, 0, 0.1)',
        floating: '0 4px 14px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
};

export default config;
