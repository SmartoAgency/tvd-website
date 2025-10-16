/* eslint-disable linebreak-style */
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
  mode: process.argv.includes('--production') ? 'production' : 'development',
  entry: {
    'immediate-loading': './src/assets/scripts/immediate-loading.js',
    index: './src/assets/scripts/index-app.js',
    home: './src/assets/scripts/home.js',
    services: './src/assets/scripts/services.js',
    about: './src/assets/scripts/about.js',
    'single-project': './src/assets/scripts/gulp-modules/single-project.js',
    'single-news': './src/assets/scripts/single-news.js',
    news: './src/assets/scripts/news.js',
    projects: './src/assets/scripts/projects.js',
    history: './src/assets/scripts/history.js',
  },
  output: {
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            targets: 'defaults',
            presets: [
              ['@babel/preset-env']
            ]
          }
        }
      }
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks(chunk) {
            // exclude `my-excluded-chunk`
            return chunk.name !== 'immediate-loading';
          },
        },
      },
    },
  },
  plugins: [
    // new UglifyJSPlugin({
    //   sourceMap: true,
    //   uglifyOptions: {
    //     compress: {
    //       drop_console: process.argv.includes('--production'),
    //     },
    //   },
    // }),
  ],
};

module.exports = config;
