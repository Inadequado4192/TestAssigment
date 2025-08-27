import path from "path";
import type { Configuration as WebpackConfig } from "webpack";
import type { Configuration as DevServerConfig } from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";


interface Config extends WebpackConfig {
    devServer?: DevServerConfig;
}

export const mode: Config["mode"] = process.env.NODE_ENV === "production" ? "production" : "development"

export default {
    mode,
    target: "web",
    entry: "./src/index.ts",
    output: {
        filename: "index.js",
        path: path.join(__dirname, "./public"),
    },
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
        plugins: [
            new TsconfigPathsPlugin({
                extensions: [".ts", ".tsx", ".js"]
            })
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            inject: "body",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader",
                    options: { transpileOnly: true },
                },
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
    },
    devServer: {
        hot: true,
        port: 3000
    },
} satisfies Config;