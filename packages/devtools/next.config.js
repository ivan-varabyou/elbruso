const path = require("path");

module.exports = {
  resolveAlias: {
    "devtools/builder/webpack": path.resolve(__dirname, "./src/builder/webpack/loader.js"),
  },
};
