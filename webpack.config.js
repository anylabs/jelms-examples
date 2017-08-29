const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
const merge = require("webpack-merge")
const webpack = require("webpack")
const common = {
  devtool: "source-map",
  entry: {
    counter: "./counter",
    github: "./github",
  },
  module: {
    rules: [
      {
        include: /counter|github/,
        loader: "awesome-typescript-loader",
        test: /\.tsx?$/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
}

if (process.env.npm_lifecycle_event === "build") {
  module.exports = merge(common, {
    output: {
      filename: "dist/[name]/app.js",
    },
    plugins: [new UglifyJSPlugin({ sourceMap: true })],
  })
} else {
  module.exports = merge(common, {
    devServer: {
      hot: true,
    },
    output: {
      filename: "[name]/app.js",
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ],
  })
}
