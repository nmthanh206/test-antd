// const defaultColors = require("tailwindcss/colors");
module.exports = {
   mode: "jit",
   purge: [
      "./src/pages/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}",
   ],
   darkMode: false, // or 'media' or 'class'
   theme: {
      // colors: {
      //    transparent: "transparent",
      //    current: "currentColor",

      //    ...defaultColors,
      // },
      extend: {
         screens: {
            "3xl": "1600px",
            // => @media (min-width: 1536px) { ... }
         },
      },
   },
   variants: {
      extend: {},
   },
   plugins: [],
};
