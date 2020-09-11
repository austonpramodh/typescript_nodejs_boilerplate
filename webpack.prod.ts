import * as path from "path";

import { merge } from "webpack-merge";
import * as webpack from "webpack";

import baseWebpackConfig from "./webpack.base";

const config: webpack.Configuration = {
    mode: "production",
    devtool: "source-map",
    plugins: [],
    output: {
        path: path.resolve(__dirname, "dist"),
    },
};

export default merge(baseWebpackConfig, config);
