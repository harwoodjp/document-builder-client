const path = require("path")

module.exports = {
  entry: path.resolve(__dirname, "./static/js/app.js"),
  output: {
    path: path.join(__dirname, './static'),
    filename: 'app.bundle.js',
  },

  watch: true,

  module: {
    rules: [

      { // babel, es6, react
        test: /\.js$/,
        exclude: /node_modules/, 
        use: [{
          loader: "babel-loader"
        }]
      },

      { // sass
        test: [/\.css$/, /\.scss$/, /\.sass$/],
        use: [
          { loader: "style-loader" }, 
          { loader: "css-loader" }, 
          { loader: "sass-loader" }
        ]
      }

    ],
  },

  devServer: {
    contentBase: path.join(__dirname, './'),
    compress: true,
    port: 1776
  }  


};