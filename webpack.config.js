const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

console.log(process.env.NODE_ENV);

module.exports = {
    entry: {
        bundle: "./src/scripts/index.js",
    },

    output: {
        publicPath: "",
        path: path.resolve(__dirname, "dist"),
        filename: "./scripts/[name].js",
    },

    // devtool: "#cheap-module-source-map",

    devServer: {contentBase: './dist'},

    module: {
        rules: [
            {
                test: /\.html$/,
                include: [path.resolve(__dirname, "src")],
                loader: "html-loader",
                options: {
                    minimize:
                        false
                    // true
                }
            },
            // {
            //     test: /\.css$/,
            //     use: [{loader: 'style-loader'}, {loader: 'css-loader'}],
            // },
            {
                test: /\.s?css$/,
                include: [path.resolve(__dirname, "src/styles")],
                use: ExtractTextPlugin.extract({
                    use: [
                        {loader: "css-loader"},
                        {loader: "sass-loader"}
                    ],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /.jsx?$/,
                include: [path.resolve(__dirname, "src/scripts")],
                loader: "babel-loader",
                options: {
                    presets: ["es2015", "react"]
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'url-loader?limit=10000',
                    'img-loader'
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: "Index",
            template: path.resolve(__dirname, "src") + "/index.html"
        }),
        new ExtractTextPlugin({
            // disable: process.env.NODE_ENV === "development",
            filename: "./styles/styles.css"
        })
    ]
};
