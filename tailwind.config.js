/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        galaxy: {
          // Deep space blacks
          void: '#030303',
          deep: '#060609',
          base: '#0a0a10',
          surface: '#0f0f18',
          elevated: '#161620',
          border: 'rgba(255,255,255,0.06)',
          // Text
          text: '#e4e4ec',
          muted: '#5a5a70',
          subtle: '#9090a8',
          // Accent — inspired by real deep space photo
          cyan: '#4dc4e8',
          cyanDim: 'rgba(77,196,232,0.15)',
          purple: '#8b65c8',
          purpleDim: 'rgba(139,101,200,0.12)',
          pink: '#c46b8a',
          pinkDim: 'rgba(196,107,138,0.12)',
          // Legacy aliases (for compatibility)
          royal: '#4d9de0',
          candy: '#c46b8a',
        },
        // Keep studio namespace for backward compat
        studio: {
          bg: '#0a0a10',
          surface: '#0f0f18',
          elevated: '#161620',
          text: '#e4e4ec',
          muted: '#5a5a70',
          royal: '#4d9de0',
          royalDark: '#1a3d6e',
          purple: '#8b65c8',
          purpleDark: '#1e1435',
          candy: '#c46b8a',
          candyHover: '#d4849f',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        // Subtle dark shadows, no more blue glow
        glow: '0 0 60px rgba(77, 196, 232, 0.08), 0 4px 24px rgba(0,0,0,0.5)',
        card: '0 2px 16px rgba(0,0,0,0.4)',
        candy: '0 0 20px rgba(196, 107, 138, 0.15)',
        'inner-border': 'inset 0 0 0 1px rgba(255,255,255,0.06)',
      },
      letterSpacing: {
        widest2: '0.25em',
      },
    },
  },
  plugins: [],
}
