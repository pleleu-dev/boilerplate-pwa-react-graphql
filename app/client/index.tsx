import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "@components/App";
import {
	ApolloProvider,
	ApolloClient,
	HttpLink,
	InMemoryCache
} from "@apollo/client";

declare global {
	interface Window {
		__APOLLO_STATE__: any;
	}
}

const cache = new InMemoryCache().restore(window.__APOLLO_STATE__);

const client = new ApolloClient({
	cache,
	link: new HttpLink({ uri: "/graphql" }),
	defaultOptions: {
		query: {
			fetchPolicy: "cache-first"
		}
	},
	ssrForceFetchDelay: 100
});

const root = document.getElementById("root");

ReactDOM.render(
	<ApolloProvider client={client}>
		<Router>
			<App />
		</Router>
	</ApolloProvider>,
	root
);
