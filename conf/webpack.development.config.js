import webpack from 'webpack';
import Config from 'webpack-config';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';

export default new Config().extend('conf/webpack.base.config.js').merge({
    entry: [
        'webpack-hot-middleware/client?reload=true',
        'react-hot-loader/patch',
        __dirname + '/../src/index.js'
    ],

    output: {
        path: __dirname + '/../docs',
        filename: 'bundle.js'
    },

    devtool: 'eval',

    module: {
        rules: [
            {
                test: /\.html$/,
                include: [path.resolve(__dirname, 'src')],
                loader: 'html-loader?minimize=false'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: 'style-loader',           // use style-loader in development
                })
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({disable: true})
    ]
});