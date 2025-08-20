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
        // Deep sea blues - primary colors
        'deep-blue': {
          900: '#0c1426',
          800: '#1e2a47',
          700: '#2d4065',
          600: '#3c5684',
          500: '#4b6ca3',
          400: '#6b8bc4',
          300: '#8ba9d4',
          200: '#abc7e4',
          100: '#cbe5f4',
        },
        // Ocean teals - accent colors
        'ocean-teal': {
          900: '#0d2d2a',
          800: '#1a4a45',
          700: '#276660',
          600: '#34837b',
          500: '#41a096',
          400: '#5eb3aa',
          300: '#7bc6be',
          200: '#98d9d2',
          100: '#b5ece6',
        },
        // Coral accents - for CTAs and highlights
        'coral': {
          600: '#e55a2b',
          500: '#ff6b35',
          400: '#ff8555',
          300: '#ff9f75',
        },
        // Neutral grays from deep water
        'sea-gray': {
          900: '#1a1f2e',
          800: '#2d3748',
          700: '#4a5568',
          600: '#718096',
          500: '#a0aec0',
          400: '#cbd5e0',
          300: '#e2e8f0',
          200: '#edf2f7',
          100: '#f7fafc',
        },
      },
    },
  },
  plugins: [],
};
