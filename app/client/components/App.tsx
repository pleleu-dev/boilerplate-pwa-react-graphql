import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";

import Home from "@routes/Home";
import About from "@routes/About";
import Contact from "@routes/Contact";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
	background-color: teal;
	font-family: "Roboto";
  }
`;

const Wrapper = styled.div`
	padding: 4em;
	background: papayawhip;
`;

const HELLO = gql`
	{
		hello
	}
`;

const App = () => {
	const { loading, error, data } = useQuery(HELLO);
	if (loading) return <p>/>Loading...</p>;
	if (error) return <p>Error :(</p>;
	return (
		<>
			<GlobalStyle />
			<h1>Boiler plate</h1>
			<Wrapper>
				<Link to="/">Home</Link>
				<Link to="/about">About</Link>
				<Link to="/contact">Contact</Link>
			</Wrapper>
			<Switch>
				<Route path="/" exact>
					<Home title={data.hello} />
				</Route>
				<Route path="/about">
					<About title={"About"} />
				</Route>
				<Route path="/contact">
					<Contact title={"Contact"} />
				</Route>
			</Switch>
		</>
	);
};

export default App;
