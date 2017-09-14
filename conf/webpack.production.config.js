import webpack from 'webpack';
import Config from 'webpack-config';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import path from 'path';

export default new Config().extend('conf/webpack.base.config.js').merge({
    output: {
        path: __dirname + '/../docs',
        filename: 'bundle.min.js'
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                include: [path.resolve(__dirname, 'src')],
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }],
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
        new ExtractTextPlugin({filename: 'styles.css'}),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {discardComments: {removeAll: true}},
            canPrint: true
        })
    ]
});