let path = require("path");
let htmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './main.js',
    output: {
        //path:'./dist/js',
        path: path.resolve(__dirname, './dist'),
        filename: './assets/js/index.js'
    },
    module: {
        rules: [
            {
                test:/\.(html|htm)$/i,
                    use:'html-withimg-loader', // 解析 html中的图片资源
            },
            {
                test: /\.ejs$/,
                loader: 'ejs-loader',
                options: {
                    esModule: false
                }
            },
            {
                test: /\.m?js$/,
                exclude: path.resolve(__dirname, './node_modules'),
                include: [
                    path.resolve(__dirname, './src')
                ],
                //include: path.resolve(__dirname,'./src'),
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                //use: ['style-loader', 'css-loader', 'postcss-loader'],
                //use: ["style-loader", "css-loader", "postcss-loader"],
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        },
                    },
                    'postcss-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ],
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.(png|gif|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 5120,
                            name: './assets/img/[name].[ext]?[hash]',
                            esModule:false
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.ejs',
            inject: false
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './src/assets/css'),
                    to: path.resolve(__dirname, './dist/assets/css'),
                    globOptions: {
                        ignore: ['**/*.scss','**/*.map'],// **表示当前目录
                    }
                },
                {
                    from: path.resolve(__dirname, './src/assets/js'),
                    to: path.resolve(__dirname, './dist/assets/js'),
                    globOptions: {
                        ignore: ['**/index.js'],
                    }
                },
                {
                    from: path.resolve(__dirname, './src/assets/img'),
                    to: path.resolve(__dirname, './dist/assets/img'),
                },
            ]
        }),
    ]
};