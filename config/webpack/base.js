const path = require("path");
const fs = require("fs");
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const resolvePath = {
	build: resolveApp("./build/"),
	nodeModules: resolveApp("./node_modules"),
	components: resolveApp("./app/client/components"),
	images: resolveApp("./app/client/static/img"),
	fonts: resolveApp("./app/client/static/fonts"),
	routes: resolveApp("./app/routes"),
	style: resolveApp("./app/client/style")
};

module.exports = {
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
		alias: {
			"@components": resolvePath.components,
			"@routes": resolvePath.routes,
			"@images": resolvePath.images,
			"@fonts": resolvePath.fonts
		}
	},
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				include: resolvePath.app,
				exclude: [resolvePath.nodeModules, resolvePath.build],
				use: {
					loader: "babel-loader",
					options: {
						// It enables caching directory for faster rebuilds.
						cacheDirectory: true
					}
				}
			},
			{
				test: /\.(jpg|png|gif|svg|pdf|ico)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							outputPath: "static/img/",
							publicPath: "static/img/"
						}
					}
				]
			},
			{
				test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							outputPath: "static/fonts/",
							publicPath: "static/fonts/"
						}
					}
				]
			}
		]
	}
};
