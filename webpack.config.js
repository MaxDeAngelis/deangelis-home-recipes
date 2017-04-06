var webpack = require('webpack');

module.exports = { 
    entry: './root/lib/root.jsx',
    output: {
        path: 'root',
        filename: 'bundle.js'
    },
    /*plugins: [
      new webpack.optimize.UglifyJsPlugin({minimize: true})
    ],
    devtool: 'inline-source-map',*/
    devServer: {
        inline: true,
        contentBase: "./root",
        port: 8080,
        proxy: [{
            path: /./,
            target: "http://localhost:8888/"
        }]
    },
    module: {   
        loaders: [{
                test: /.(jsx)?$/,
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
            }/*,
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=images/[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }*/
        ] 
    }
};