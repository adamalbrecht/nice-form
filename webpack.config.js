var path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');

var nodeModulesPath = path.resolve(__dirname, './node_modules');

module.exports = {
  serverPort: 9876,
  context: __dirname,
  entry: [
    "./src/entry.jsx"
  ],
  output: {
    path: "./priv/static/js",
    filename: "bundle.js",
    extensions: ['', '.js', '.jsx', '.css', '.scss'],
    path: path.join(__dirname, 'demo'),
    publicPath: '/static/'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader"},
      { test: /\.css/, loader: "style-loader!css-loader" }
    ]
  },
  plugins: [
    new WebpackNotifierPlugin()
  ]
 
}
