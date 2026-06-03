import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        slds: {
          navy: '#032D60',
          blue: '#0176D3',
          gray: '#F3F3F3',
          border: '#DDDBDA',
          muted: '#706E6B',
          'health-green-text': '#2E7D32',
          'health-green-bg': '#EDF7EE',
          'health-yellow-text': '#A16403',
          'health-yellow-bg': '#FEF3C7',
          'health-red-text': '#BA0517',
          'health-red-bg': '#FEEEF0',
        },
      },
      fontFamily: {
        sans: ['"Salesforce Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        base: ['13px', '1.5'],
      },
      borderRadius: {
        card: '4px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config
