const path = require("path");
const nodeExternals = require("webpack-node-externals");

const config = {
    target: "electron-main",
    entry: "./app/electron/main.ts",
    output: {
        filename: "main.js",
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
                test: /\.node$/,
                loader: "node-loader",
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    node: {
        __dirname: false,
        __filename: false,
    },
    plugins: [],
    externals: [nodeExternals()]
};

module.exports = (env, argv) => {
    return config;
};
