var webpack = require('webpack');
var path = require('path');

module.exports = function (config) {
  config.set({
    browsers: [ 'PhantomJS' ],
    singleRun: true,
    frameworks: [ 'mocha', 'es5-shim', 'sinon-chai'],
    files: [
      'src/**/*_test.jsx'
    ],
    preprocessors: {
      'src/**/*.jsx': ['webpack'],
      'src/**/*.js': ['webpack']
    },
    reporters: ['dots', 'notify', 'coverage'],
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    webpack: {
      devtool: 'inline-source-map',
      module: {
        preLoaders: [
          {
            test: /\_test.jsx?$/,
            include: path.resolve('src/'),
            loader: 'babel'
          },
          {
            test: /\.jsx?$/,
            exclude: /\_test.jsx?$/,
            include: path.resolve('src/'),
            loader: 'isparta'
          }
        ],
        loaders: [
          { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
      }
    },
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'lcovonly', subdir: '.'},
        { type: 'text'}
      ]
    }
  });
};
