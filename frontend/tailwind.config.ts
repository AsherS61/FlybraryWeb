import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './providers/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx,mdx,json}',
    './libs/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        'main-1': '#171717',
        'main-2': '#6b7280',
        'main-3': '#b3b8c1',
        'main-4': '#eaeaea',
        'main-5': '#f9f9f9',
        'main-6': '#fbfbfb',
        white: '#ffffff',
        'error-1': '#dc2626',
        'error-2': '#ef4444',
        'error-3': '#601410',
        brand: '#4f46e5',
        yellow: '#fef9c3',
        star: '#facc15',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem', // 1rem = 16px
          sm: '2rem', // 2rem = 32px
          lg: '4rem', // 4rem = 64px
          xl: '5rem', // 5rem = 80px
          '2xl': '6rem', // 6rem = 96px
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
} satisfies Config
