/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{html,ts}"],
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')
  ],
}
