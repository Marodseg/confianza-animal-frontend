/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './src/**/*.html', // TODO: Take care of warn about this in the build (not relevant now)
      './index.html'
  ],
  prefix: "tw-",
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  important: true,
}
