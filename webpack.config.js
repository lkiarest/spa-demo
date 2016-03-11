var webpack = require("webpack"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    path = require("path");

var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    entry: {
        main: "./src/vm/main"
    },
    output: {
        path: path.join(__dirname, "../nodejs/public"),
        filename: "[name].js",
        chunkFilename: "[name].chunk.[chunkhash:8].js" //给require.ensure用
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")},
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'}, // 小于8K的图片会被转成base64字符串
            {test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader'}
        ],
        preLoaders: [{test: /\.(js|css)$/, loader: "amdcss-loader"}]
    },
    plugins: [
        commonsPlugin,
        new ExtractTextPlugin("[name].css"),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        })
    ],
    resolve: {
        extensions: [".js", "", ".css", ".html"],
        alias: {
            // avalon: path.join(__dirname, "src/vendor/avalon2/dist/avalon.shim"),//目前1.5版本avalon的widget有内存泄露问题，暂时还是用1.4
            avalon: path.join(__dirname, "src/vendor/avalon/dist/avalon.shim"),
            "../avalon": path.join(__dirname, "src/vendor/avalon/dist/avalon.shim"),
            oniui: path.join(__dirname, "src/vendor/avalon.oniui"),
            domReady: path.join(__dirname, "src/vendor/domReady/domReady"),
            jquery: path.join(__dirname, "src/vendor/jquery/jquery.min"),
            mmState: path.join(__dirname, "src/vendor/mmRouter/mmState"),
            domReady: path.join(__dirname, "src/vendor/domReady/domReady"),
            cookie: path.join(__dirname, "src/vendor/js-cookie/js.cookie"),
            utils: path.join(__dirname, "src/utils"),
            config: path.join(__dirname, "src/config"),
            service: path.join(__dirname, "src/service"),
            component: path.join(__dirname, "src/component"),
            plugin: path.join(__dirname, "src/plugin/plugin"),
            plugins: path.join(__dirname, "plugins"),
            ztree: path.join(__dirname, "src/vendor/ztree/js/jquery.ztree.all-3.5"),
            datetimepicker: path.join(__dirname, "src/vendor/datetimepicker/jquery.simple-dtpicker")
        }
    }
};
