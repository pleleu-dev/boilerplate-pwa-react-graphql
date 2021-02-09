import React from "react";
import Helmet from "react-helmet";

export interface Props {
	title?: string;
}

const About = ({ title }: Props) => (
	<>
		<Helmet>
			<title>About Page</title>
			<meta name="description" content="About Page" />
		</Helmet>

		<h2 onClick={(): void => alert(title)}>Hello from {title}</h2>
	</>
);
export default About;
