const webpack = require('webpack')
let path = require('path')
let PROD = (process.env.NODE_ENV === 'production')
const LEGACY = (process.env.LEGACY)
const MINIMIZE = (process.env.MINIMIZE === 'true')
const hostname = 'localhost'
let port = 8080

let filename = '[name]'
let sourceMapFilename = '[name]'
if (LEGACY) {
  filename += '.legacy'
}
if (MINIMIZE) {
  filename += '.min.js'
  sourceMapFilename += '.min.js.map'
} else {
  filename += '.js'
  sourceMapFilename += '.js.map'
}

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    epub: './src/epub.js'
  },
  devtool: MINIMIZE ? false : 'source-map',
  output: {
    path: path.resolve('../quickpad/src/assets/epubjs/'),
    filename: filename,
    sourceMapFilename: sourceMapFilename,
    library: 'ePub',
    libraryTarget: 'umd',
    libraryExport: 'default',
    publicPath: '../quickpad/src/assets/epubjs/'
  },
  optimization: {
    minimize: MINIMIZE
  },
  externals: {
    'jszip/dist/jszip': 'JSZip',
    xmldom: 'xmldom'
  },
  plugins: [],
  resolve: {
    alias: {
      path: 'path-webpack'
    }
  },
  devServer: {
    host: hostname,
    port: port,
    inline: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
              targets: LEGACY ? 'defaults' : 'last 2 Chrome versions, last 2 Safari versions, last 2 ChromeAndroid versions, last 2 iOS versions, last 2 Firefox versions, last 2 Edge versions',
              corejs: 3,
              useBuiltIns: 'usage',
              bugfixes: true,
              modules: false
            }]]
          }
        }
      }
    ]
  },
  performance: {
    hints: false
  }
}
