const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
    watchOptions: {
        poll: 1000
    },
    resolve: {
        modules: ["node_modules"],
        extensions: [".tsx", ".ts", ".js", ".json"]
    },
    entry: __dirname + "/src/index.js",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "[name].js",
        publicPath: "/"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
            filename: "index.html",
            minify: {
                collapseWhitespace: true
            }
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(s?[ac]ss)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            singleton: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false,
                            importLoaders: 2,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('precss'),
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            modules: true,
                            localIdentName: "[name]_[local]_[hash:base64:5]",
                            importLoaders: 1,
                            sourceMap: true,
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png)$/,
                use: [
                    {
                        loader: 'url-loader'
                    }
                ]
            }
        ]
    },
    devServer: {
        host: '0.0.0.0',
        port: 4000,
        historyApiFallback: true,
        compress: true,
        open: true
    }
};

module.exports = config;
