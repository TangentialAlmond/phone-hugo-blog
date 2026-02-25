import daisyui from "daisyui"
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./content/**/*.{html,md}",
    "./layouts/**/*.html",
    "./themes/**/layouts/**/*.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    themes: ["cupcake"],
  },
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [daisyu/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./content/**/*.{html,md}",
    "./layouts/**/*.html",
    "./themes/**/layouts/**/*.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
  ],
  // daisyUI config (optional)
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
}i],
}

