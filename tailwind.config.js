import daisyui from "daisyui"
import typography from "@tailwindcss/typography"

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
    typography
  ],
  daisyui: {
    themes: ["light"],
  },
}