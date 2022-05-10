const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./app/index.html",
    filename: "./index.html",
    publicPath: ".",
});

const config = {
    target: "electron-renderer",
    entry: "./app/react/renderer.tsx",
    output: {
        filename: "renderer.js",
        path: path.resolve(__dirname, "..", "dist"),
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            /*
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[contenthash].[ext]",
                            outputPath: "fonts/",
                        },
                    },
                ],
            },
            */
            {
                test: /\.(jpg|png|svg|webp)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 32768,
                        name: "[contenthash].[ext]",
                        outputPath: "asset/",
                    },
                },
            },
            {
                test: /\.(mp4)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[contenthash].[ext]",
                            outputPath: "asset/",
                        },
                    },
                ],
            },
            {
                test: /\.node$/,
                loader: "node-loader",
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    plugins: [htmlPlugin],
    optimization: {
        concatenateModules: false,
    },
};

module.exports = (env, argv) => {
    return config;
};
