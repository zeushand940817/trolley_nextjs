import config from "../config.js";
import Layout from "../components/MyLayout.js";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import Vista from "../components/Vista.js";
import data from "../data/dummy.json";

const Index = props => (
	<Layout>
		<Vista />
	</Layout>
);

export default Index;
