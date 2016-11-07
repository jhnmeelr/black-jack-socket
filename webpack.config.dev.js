import path from 'path';
import webpack from 'webpack';

export default {
    debug: true,
    devtools: 'cheap-module-eval-source-map',
    noInfo: false,
    entry: [
        'webpack-hot-middleware/client',
        path.join(__dirname, '/client/scripts/index.js')
    ],
    target: 'web',
    output: {
        path: '/',
        publicPath: 'http://localhost:3000/'
    },
    devServer: {
      contentBase: './client/scripts'
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'client/scripts'),
                loaders: [ 'react-hot', 'babel' ]
            },
            {
                test: /\.(css|scss)$/,
                loaders: ["style?fixUrls", "css?sourceMap", "autoprefixer", "sass?sourceMap"]
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg|ico)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            },
            {
                test: /\.(eot|ttf|otf|woff|woff2)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            }
        ]
    }
}