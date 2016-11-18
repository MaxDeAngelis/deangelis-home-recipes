var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './root/lib/main.jsx',
  output: {
    path: __dirname,
    filename: './root/lib/bundle.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
    },
    {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
    },
    {
        test: /\.css$/,
        loader: "style!css"
    },
    {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=./root/images/[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
    }
    ]
  }
};
