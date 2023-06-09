const path = require("path");

module.exports = {
  entry: { bundle: "./src/main.ts", server: "./cube-resolver.server.ts" },
  devtool: "inline-source-map",
  target: ["es6", "node"],
  watchOptions: {
    ignored: /resolvers/,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
};
