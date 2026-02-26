import daisyui from "daisyui"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./content/**/*.{html,md}",
    "./layouts/**/*.html",
    "./themes/**/layouts/**/*.html",
    "./assets/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: ["cupcake"],
  },
}