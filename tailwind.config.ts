/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    'composables/**/*.{js,ts}',
    'plugins/**/*.{js,ts}',
    'App.{js,ts,vue}',
    'app.{js,ts,vue}',
  ],
  theme: {
    extend: {
      fontFamily: {
        lobster: "'Lobster', cursive",
      },
    },
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
}
