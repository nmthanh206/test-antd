const withLess = require("next-with-less");
const path = require("path");

const pathToLessFileWithVariables = path.resolve("./styles/globals.less");

module.exports = {
   ...withLess({
      lessLoaderOptions: {
         additionalData: (content) =>
            `${content}\n\n@import '${pathToLessFileWithVariables}';`,

         //  lessOptions: {
         //     modifyVars: {
         //        "primary-color": "#9900FF",
         //        "border-radius-base": "2px",
         //     },
         //  },
      },
   }),
   // reactStrictMode: true,
};
