/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './privacy-policy/index.html', './terms-and-conditions/index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // CRYZO brand (from the app logo and android-pos theme)
        brand: { light: '#ff9130', DEFAULT: '#fc8019', dark: '#e66f0a', text: '#b95408' },
        ink: { DEFAULT: '#0f1115', 2: '#171a21', 3: '#1e222b' },
        info: '#2e90fa',
        success: '#12b76a',
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
};
