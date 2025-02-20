const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/code/js/index.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/code/html/index.html",
      filename: "index.html",
    }),
  ],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.ico$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/images/favicon/[name][ext]",
        },
      },
      {
        test: /\.(woff2|woff|ttf)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name][ext]",
        },
      },
      {
        test: /\.svg$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/images/icons/[name][ext]",
        },
      },
    ],
  },
};
