const defaultColors = require("tailwindcss/colors");
module.exports = {
   mode: "jit",
   purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
   darkMode: false, // or 'media' or 'class'
   theme: {
      colors: {
         transparent: "transparent",
         current: "currentColor",

         ...defaultColors,
      },
      extend: {},
   },
   variants: {
      extend: {},
   },
   plugins: [],
};
