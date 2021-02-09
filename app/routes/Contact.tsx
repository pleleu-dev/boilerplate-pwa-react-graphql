import React from "react";
import Helmet from "react-helmet";

export interface Props {
	title?: string;
}
const Contact = ({ title }: Props) => (
	<>
		<Helmet>
			<title>Contact Page</title>
			<meta name="description" content="Contact Page" />
		</Helmet>

		<h2>Hello from {title}</h2>
	</>
);
export default Contact;
