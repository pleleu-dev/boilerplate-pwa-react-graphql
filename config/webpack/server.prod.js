const path = require("path");
const fs = require("fs");
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const nodeExternals = require("webpack-node-externals");
const { GenerateSW } = require("workbox-webpack-plugin");

const resolvePath = {
	root: resolveApp("./"),
	index: resolveApp("./app/server/index.tsx"),
	app: resolveApp("./app"),
	build: resolveApp("./dist/"),
	swTemplate: resolveApp(`./config/sw-template.js`)
};

module.exports = {
	name: "server",
	mode: "production",
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
	plugins: [
		new GenerateSW({
			swDest: "sw.js",
			additionalManifestEntries: [
				{
					url: "/index.html",
					revision: "99999"
				},
				{
					url: "/manifest.json",
					revision: "99999"
				},
				{
					url: "/favicon.ico",
					revision: "99999"
				}
			]
		})
	]
};
