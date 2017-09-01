import webpack from 'webpack';
import Config from 'webpack-config';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';

console.log('prod');

export default new Config().extend('conf/webpack.base.config.js').merge({
    output: {
        path: __dirname + '/../dist',
        filename: 'bundle.min.js'
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                include: [path.resolve(__dirname, 'src')],
                loader: 'html-loader?minimize=true'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                })
            }
        ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
        new ExtractTextPlugin({filename: 'styles.css'})
    ]
});