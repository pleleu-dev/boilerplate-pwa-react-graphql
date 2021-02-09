import React from "react";
import loadable from "@loadable/component";
import Helmet from "react-helmet";
import Loading from "@components/Loading";

const LoadableComponent = loadable(
	() =>
		import(/* webpackChunkName: "SomeComponent" */ "@components/SomeComponent"),
	{
		fallback: <Loading />
	}
);

export interface Props {
	title?: string;
}
const Home = ({ title }: Props) => (
	<>
		<Helmet>
			<title>Home Page</title>
			<meta name="description" content="Home" />
		</Helmet>
		<LoadableComponent />
		<h2 onClick={() => alert(title)}> Hello from {title}</h2>
	</>
);
export default Home;
