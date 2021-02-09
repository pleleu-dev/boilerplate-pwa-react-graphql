var merge = require("webpack-merge");
const base = require("./base");
const clientDev = require("./client.dev");
const clientProd = require("./client.prod");
const serverDev = require("./server.dev");
const serverProd = require("./server.prod");

module.exports = (env, argv) => {
	switch (env) {
		case "clientDev":
			return merge(base, clientDev);
			break;
		case "clientProd":
			return merge(base, clientProd);
			break;
		case "serverDev":
			return merge(base, serverDev);
			break;
		case "serverProd":
			return merge(base, serverProd);
			break;
		default:
			console.error("webpack:error env not specified");
	}
};
