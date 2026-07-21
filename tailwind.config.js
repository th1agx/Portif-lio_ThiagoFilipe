/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        vanilla: {
          bg: '#F6F4EF', // Warm paper off-white background
          text: '#1A1A1A', // Rich Charcoal text
          muted: '#666666', // Softer grey for secondary text
          border: 'rgba(26, 26, 26, 0.08)', // Very thin subtle lines
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
