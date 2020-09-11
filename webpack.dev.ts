import * as path from "path";

import "dotenv/config";
import { merge } from "webpack-merge";
import * as webpack from "webpack";
import NodemonPlugin from "nodemon-webpack-plugin";
import isDocker = require("is-docker");

const isDebugMode = process.argv.find((arg) => arg === "--debug");

const isRunningInsideDocker = isDocker();

if (isRunningInsideDocker) {
    console.log("Running inside a Docker container");
}

import baseWebpackConfig from "./webpack.base";
const config: webpack.Configuration = {
    mode: "development",
    watch: true,
    watchOptions: {
        poll: isRunningInsideDocker,
    },
    devtool: isDebugMode ? "cheap-module-eval-source-map" : "eval", //TODO: Change this when in debug mode
    output: {
        path: path.resolve(__dirname, "dist"),
        devtoolModuleFilenameTemplate: isDebugMode ? "file:///[absolute-resource-path]" : undefined,
    },
    plugins: [
        new NodemonPlugin({
            nodeArgs: isDebugMode ? ["--inspect"] : undefined,
            watch: [path.resolve("./dist")],
            script: "./dist/index.bundle.js",
            legacyWatch: isRunningInsideDocker,
        }),
    ],
};

export default merge(baseWebpackConfig, config);
