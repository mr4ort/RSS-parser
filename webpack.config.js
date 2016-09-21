"use strict";

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {

  context: __dirname + '/app',

  entry: {
    news:  "./news",
    about: "./details"
  },

  output: {
    path:     __dirname + '/dist/js',
    filename: "[name].js",
    library:  "[name]"
  },

  watch: true,

  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: NODE_ENV == 'development' ? "cheap-inline-module-source-map" : null,

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
      LANG:     JSON.stringify('ru')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "common"
    })
  ],

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions:         ['', '.js']
  },

  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates:    ['*-loader', '*'],
    extensions:         ['', '.js']
  },


  module: {

    loaders: [{
      test:   /\.js$/,
      loader: 'babel',
      query: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
      }
    }]

  }
};


if (NODE_ENV == 'production') {
  module.exports.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          // don't show unreachable variables etc
          warnings:     false,
          drop_console: true,
          unsafe:       true
        }
      })
  );

}