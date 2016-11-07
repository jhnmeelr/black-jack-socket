import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};

let extractCSS = new ExtractTextPlugin('styles.css');

export default {
    debug: true,
    devtools: 'source-map',
    noInfo: false,
    entry: './client/scripts/index',
    target: 'web',
    output: {
        path: __dirname + '/dist',
        publicPath: 'http://financial-book.herokuapp.com/',
        filename: 'bundle.js'
    },
    devServer: {
      contentBase: './client/scripts'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin(GLOBALS),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        extractCSS
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: path.join(__dirname, 'client/scripts'),
                loaders: [ 'react-hot', 'babel' ]
            },
            {
                test: /\.(css|scss)$/,
                loader: extractCSS.extract(['css', 'autoprefixer', 'sass'])
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg|ico)$/,
                exclude: /node_modules/,
                loader:'file?limit=200000&name=assets/images/[name].[ext]'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                exclude: /node_modules/,
                loader: 'file?limit=200000&name=assets/fonts/[name].[ext]'
            }
        ]
    }
}