const path = require("path");
const fs = require("fs");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const LoadableWebpackPlugin = require("@loadable/webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const resolvePath = {
	root: resolveApp("./"),
	app: resolveApp("./app"),
	build: resolveApp("./build/"),
	index: resolveApp("./app/client/index.tsx"),
	public: resolveApp("./app/client/static/public/")
};

module.exports = {
	mode: "development",
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
		new LoadableWebpackPlugin(),
		new CopyPlugin([
			{
				from: resolvePath.public,
				to: resolvePath.build
			}
		])
	],
	devtool: "source-map"
};
