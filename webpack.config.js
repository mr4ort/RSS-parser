"use strict";

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

console.log(NODE_ENV);

module.exports = {


  entry: {
    news:  "./app/news.js",
    details: "./app/details.js"
  },

  output: {
    path:     __dirname + '/dist/js',
    filename: "[name].js",
    library:  "[name]"
  },

  watch: NODE_ENV === 'development',

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
      name: "common",
      chunks: ["news", "details"]
    }),
    new webpack.ProvidePlugin({
      //pluck: 'lodash/collection/pluck',
      $: 'jquery'
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
        presets: ['es2015']
        //plugins: ['transform-runtime']
      }
    },{
      test:   /\.html$/,
      loader: '',
      query: {
        // presets: ['es2015']
        //plugins: ['transform-runtime']
      }
    }]

  },

  devServer: {
    contentBase: './dist',
    //stats: 'minimal',
    hot: true,
    open: true,
    colors: true
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
