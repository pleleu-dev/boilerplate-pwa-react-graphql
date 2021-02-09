const path = require("path");
const fs = require("fs");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const LoadableWebpackPlugin = require("@loadable/webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
	.BundleAnalyzerPlugin;
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const resolvePath = {
	root: resolveApp("./"),
	index: resolveApp("./app/client/index.tsx"),
	app: resolveApp("./app"),
	build: resolveApp("./dist/"),
	public: resolveApp("./app/client/static/public/"),
	sw: resolveApp(`./config/service-worker.js`),
	swTemplate: resolveApp(`./config/sw-template.js`)
};

module.exports = {
	mode: "production",
	target: "web",
	entry: {
		main: resolvePath.index
	},
	output: {
		path: resolvePath.build,
		filename: "[name].[hash].js",
		chunkFilename: "[name].[hash].js"
	},
	module: {},
	plugins: [
		new CleanWebpackPlugin(),
		new CopyPlugin([
			{
				from: resolvePath.public,
				to: resolvePath.build
			}
		]),
		new LoadableWebpackPlugin()
		/*,new BundleAnalyzerPlugin()*/
	],
	optimization: {
		minimizer: [
			new UglifyJSPlugin({
				sourceMap: true,
				uglifyOptions: {
					compress: {
						inline: true
					}
				}
			})
		],
		runtimeChunk: false,
		splitChunks: {
			cacheGroups: {
				default: false,
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendor_app",
					chunks: "all",
					minChunks: 2
				}
			}
		}
	}
};
