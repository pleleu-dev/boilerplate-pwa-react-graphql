const path = require("path");
const fs = require("fs");
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const nodeExternals = require("webpack-node-externals");
const resolvePath = {
	root: resolveApp("./"),
	index: resolveApp("./app/server/index.tsx"),
	app: resolveApp("./app"),
	build: resolveApp("./build/")
};

module.exports = {
	name: "server",
	mode: "development",
	target: "node",
	externals: [nodeExternals()],
	entry: {
		index: resolvePath.index
	},
	output: {
		path: resolvePath.build,
		filename: "[name].js",
		chunkFilename: "server.[name].js",
		publicPath: "/"
	},
	devtool: "source-map"
};
