const globals = require("./globals.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const jsToScss = require("./client/utils/jsToScss.js");

module.exports = {
  entry: __dirname + "/client/app/index.js",
  output: {
    path: __dirname + "/client/dist/",
    publicPath: "/",
    filename: "index_bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "app/index.ejs",
      templateParameters: globals,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          {
            loader: "sass-loader",
            options: {
              additionalData: jsToScss(globals),
            },
          },
        ],
      },
    ],
  },
};
