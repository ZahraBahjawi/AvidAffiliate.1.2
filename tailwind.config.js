/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Google Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'mono': ['Google Sans Mono', 'ui-monospace', 'SFMono-Regular', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
        'serif': ['Google Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      },
      colors: {
        // Colors extracted from background.jpg
        'primary': {
          900: '#0a0e1a',
          800: '#1a1f2e',
          700: '#2a3142',
          600: '#3a4356',
          500: '#4a556a',
          400: '#5a677e',
          300: '#6a7992',
          200: '#7a8ba6',
          100: '#8a9dba',
        },
        // Accent colors from background highlights
        'accent': {
          900: '#1a2332',
          800: '#2a3544',
          700: '#3a4756',
          600: '#4a5968',
          500: '#5a6b7a',
          400: '#6a7d8c',
          300: '#7a8f9e',
          200: '#8aa1b0',
          100: '#9ab3c2',
        },
        // Warm accents for CTAs
        'warm': {
          600: '#d4a574',
          500: '#e4b584',
          400: '#f4c594',
          300: '#ffd5a4',
        },
        // Neutral tones from background
        'neutral': {
          900: '#0f1419',
          800: '#1f2429',
          700: '#2f3439',
          600: '#3f4449',
          500: '#4f5459',
          400: '#5f6469',
          300: '#6f7479',
          200: '#7f8489',
          100: '#8f9499',
        },
      },
    },
  },
  plugins: [],
};
