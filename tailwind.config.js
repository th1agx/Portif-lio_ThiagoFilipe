/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        studio: {
          bg: '#070812',
          surface: '#101320',
          elevated: '#161A2A',
          text: '#F4F7FB',
          muted: '#AAB3C5',
          royal: '#315CFF',
          royalDark: '#1936A3',
          purple: '#7A3CFF',
          purpleDark: '#2B174F',
          candy: '#FF4D6D',
          candyHover: '#FF6F86',
        },
      },
      fontFamily: {
        display: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 50px rgba(49, 92, 255, 0.25)',
        candy: '0 0 30px rgba(255, 77, 109, 0.22)',
      },
    },
  },
  plugins: [],
}
