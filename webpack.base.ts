import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import * as webpack from "webpack";
import nodeExternals from "webpack-node-externals";

const config: webpack.Configuration = {
    mode: "production",
    devtool: "cheap-source-map",
    entry: {
        index: "./src/index.ts",
    },
    target: "node",
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        filename: "[name].bundle.js",
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            eslint: {
                enabled: true,
                files: "./src/**/*.{ts,tsx,js,jsx}",
            },
        }),
    ],
};

export default config;
