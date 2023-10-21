import { resolve as _resolve } from "path";

export const mode = "development";
export const entry = "./src/js/jogo.ts";
export const module = {
    rules: [
        {
            test: /\.tsx?$/,
            use: "ts-loader",
            exclude: /node_modules/,
        },
    ],
};
export const resolve = {
    extensions: [".tsx", ".ts", ".js"],
};
export const output = {
    filename: "jogo.js",
    path: _resolve(__dirname, "./src"),
};
export const devtool = "source-map";