const { override, addLessLoader, adjustStyleLoaders, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = override(
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        "primary-color": "#1DA57A",
      },
    },
  }),
  adjustStyleLoaders(({ use: [, , postcss] }) => {
    const postcssOptions = postcss.options;
    postcss.options = { postcssOptions };
  }),
  addWebpackAlias({
    "@": path.resolve(__dirname, "./src"),
  })
);
