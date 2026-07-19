/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        vanilla: {
          bg: '#F5F4EE', // Off-white creamy background
          text: '#111111', // Deep black text
          muted: '#555555', // Grey text for secondary info
          border: 'rgba(17, 17, 17, 0.12)', // Thin black borders for grid lines
        },
      },
      fontFamily: {
        sans: ['Satoshi', 'sans-serif'],
        display: ['Satoshi', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        subtle: '0 4px 12px rgba(0,0,0,0.05)',
      },
      letterSpacing: {
        tightest: '-0.04em',
        widest2: '0.15em',
      }
    },
  },
  plugins: [],
}
