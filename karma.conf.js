var webpack = require('webpack');
var path = require('path');
var isparta = require('isparta');

module.exports = function (config) {
  config.set({
    browsers: [ 'PhantomJS' ],
    singleRun: true,
    frameworks: [ 'mocha', 'es5-shim', 'chai-jquery', 'jquery-2.1.0', 'sinon-chai'],
    files: [
      'src/**/*_test.jsx',
      'src/**/*_test.js'
    ],
    reporters: ['dots', 'notify', 'coverage'],
    preprocessors: {
      'src/**/*.*': ['webpack'],
      'src/*.*': ['coverage']
    },
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    webpack: {
      devtool: 'inline-source-map',
      module: {
        preLoaders: [
          {
            test: /\.jsx?$/,
            include: path.resolve('src/'),
            exclude: [
              path.resolve('src/components/__tests__'),
              path.resolve('src/data_operations/__tests__'),
              path.resolve('src/util/__tests__')
            ],
            loader: 'isparta'
          }
        ],
        loaders: [
          { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader"},
        ]
      }
    },
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },
    coverageReporter: {
      dir: 'coverage/',
      instrumenters: { isparta: isparta },
      instrumenter: {
        '**/*.(js|jsx)': 'isparta'
      },
      reporters: [
        { type: 'lcovonly', subdir: '.'},
        { type: 'text'}
      ]
    }
  });
};
