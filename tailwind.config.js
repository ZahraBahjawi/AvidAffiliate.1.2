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
    },
  },
  plugins: [],
};
