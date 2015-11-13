var webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, './node_modules');

var reactExternal = {
  root: 'React',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react'
};

var reactDomExternal = {
  root: 'ReactDom',
  commonjs2: 'react-dom',
  commonjs: 'react-dom',
  amd: 'react-dom'
};

module.exports = {
  context: __dirname,
  entry: [
    "./src/index.js"
  ],
  externals: {
    'react': reactExternal,
    'react-dom': reactDomExternal
  },
  output: {
    filename: "index.js",
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'nice-form'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};
