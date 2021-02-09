import path from "path";
import fs from "fs";
import "regenerator-runtime/runtime";
import compression from "compression";

import express from "express";
import graphqlHTTP from "express-graphql";
import fetch from "node-fetch";
import React from "react";
import { buildSchema } from "graphql";
import Helmet from "react-helmet";
import { StaticRouter } from "react-router-dom";
import { getDataFromTree } from "@apollo/react-ssr";
import {
	ApolloProvider,
	ApolloClient,
	HttpLink,
	InMemoryCache
} from "@apollo/client";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";

import htmlTemplate from "./utils/htmlTemplate";
import sslRedirect from "./utils/sslRedirect";
import App from "@components/App";

const ENV = process.env.NODE_ENV || "dev";
const DIR = ENV === "production" ? "dist" : "build";
const PORT = process.env.PORT || 3000;
const GRAPHQL_URL = process.env.GRAPHQL_URL || "http://localhost:3000/graphql";

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) =>
	path.resolve(appDirectory, relativePath);

const resolvePath = {
	build: resolveApp(`./${DIR}/`),
	views: resolveApp(`./app/server/views`),
	favicon: resolveApp(`./${DIR}/favicon.ico`),
	robot: resolveApp(`./${DIR}/robots.txt`),
	sitemap: resolveApp(`./${DIR}/sitemap.xml`),
	manifest: resolveApp(`./${DIR}/manifest.json`),
	statsFile: resolveApp(`./${DIR}/loadable-stats.json`)
};
const sitemapOptions = {
	headers: {
		"Content-Type": "text/xml;charset=UTF-8"
	}
};

const robotOptions = {
	headers: {
		"Content-Type": "text/xml;charset=UTF-8"
	}
};

const faviconOptions = {
	headers: {
		"Content-Type": "image/x-icon;charset=UTF-8"
	}
};

const manifestOptions = {
	headers: {
		"Content-Type": "application/json;charset=UTF-8"
	}
};
const app = express();
app.set("view engine", "ejs");
app.set("views", resolvePath.views);

const sheet = new ServerStyleSheet();

// Simple Schema
const schema = buildSchema(`
	type Query {
    	hello: String
  	}
`);

// The root provides a resolver function for each API endpoint
const root = {
	hello: () => {
		return "Hello world!";
	}
};
const shouldCompress = (req: any, res: any) => {
	if (req.headers["x-no-compression"]) {
		return false;
	}
	return compression.filter(req, res);
};

app.use(compression({ filter: shouldCompress }));

if (PORT !== 3000) {
	app.use(sslRedirect(ENV, 302))
}

app.get("/favicon.ico", (req: any, res: any) => {
	res.status(200).sendFile(resolvePath.favicon, faviconOptions);
});
app.get("/robots.txt", (req: any, res: any) => {
	res.status(200).sendFile(resolvePath.robot, robotOptions);
});
app.get("/sitemap.xml", (req: any, res: any) => {
	res.status(200).sendFile(resolvePath.sitemap, sitemapOptions);
});
app.get("/manifest.json", (req: any, res: any) => {
	res.status(200).sendFile(resolvePath.manifest, manifestOptions);
});
app.use(express.static(resolvePath.build, { maxAge: 2592000 }));

app.use(
	"/graphql",
	graphqlHTTP({
		schema: schema,
		rootValue: root,
		graphiql: true
	})
);

app.get(
	"/*",
	async (req: any, res: any): Promise<any> => {
		const context = {};
		const client = new ApolloClient({
			ssrMode: true,
			link: new HttpLink({ uri: GRAPHQL_URL, fetch }),
			cache: new InMemoryCache()
		});
		const extractor = new ChunkExtractor({
			statsFile: resolvePath.statsFile,
			entrypoints: ["main"]
		});
		const scriptTags = extractor.getScriptTags();
		const Jsx = (
			<ApolloProvider client={client}>
				<StaticRouter context={context} location={req.url}>
					<ChunkExtractorManager extractor={extractor}>
						<StyleSheetManager sheet={sheet.instance}>
							<App />
						</StyleSheetManager>
					</ChunkExtractorManager>
				</StaticRouter>
			</ApolloProvider>
		);

		const reactDom = await getDataFromTree(Jsx);
		const initialState = JSON.stringify(client.extract());
		const helmetData = Helmet.renderStatic();
		const styleTags = sheet.getStyleTags(); // or sheet.getStyleElement();
		const title =
			helmetData && helmetData.title ? helmetData.title.toString() : "";
		const meta =
			helmetData && helmetData.meta ? helmetData.meta.toString() : "";
		res.writeHead(200, { "Content-Type": "text/html" });

		/*res.render("index", {
			title,
			meta,
			reactDom,
			styleTags,
			scriptTags,
			initialState
		});*/
		res.end(
			htmlTemplate(reactDom, styleTags, scriptTags, initialState, helmetData)
		);
	}
);

app.listen(PORT, function () {
	console.log(`server started at ${PORT}`);
});
