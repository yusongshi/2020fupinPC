let path = require("path");
let htmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// 环境判断
let OutPut = {};
const env = process.env.NODE_ENV;
if(env === "production" || env === "none"){
    OutPut.folder = "00000";
	OutPut.assets= "00000"; 
}else{
    OutPut.folder = "dist";
	OutPut.assets= "assets"; 
};

module.exports = {
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, `./${OutPut.folder}`),
        filename: `./${OutPut.assets}/js/index.js`
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
                            name: `./${OutPut.assets}/img/[name].[ext]?[hash]`,
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
            inject: false,
            publicPath: `${OutPut.assets}`
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './src/assets/css'),
                    to: path.resolve(__dirname, `./${OutPut.folder}/${OutPut.assets}/css`),
                    globOptions: {
                        ignore: ['**/*.scss','**/*.map'],// **表示当前目录
                    }
                },
                {
                    from: path.resolve(__dirname, './src/assets/js'),
                    to: path.resolve(__dirname, `./${OutPut.folder}/${OutPut.assets}/js`),
                    globOptions: {
                        ignore: ['**/index.js'],
                    }
                },
                {
                    from: path.resolve(__dirname, './src/assets/img'),
                    to: path.resolve(__dirname, `./${OutPut.folder}/${OutPut.assets}/img`),
                },
            ]
        }),
    ]
};