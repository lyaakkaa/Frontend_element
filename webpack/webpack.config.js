const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV === 'production' ? 'production': 'development';

console.log(mode);

module.exports = {
    mode: mode,

    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin(),
    ],

    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 9000,
        hot: true
    }
}