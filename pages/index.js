import Layout from "../components/MyLayout.js";
import Vista from "../components/Vista.js";
import ReactGA from "react-ga";

const analyticsID = "UA-128935137-1";
if (process.env.NODE_ENV === "production") {
	ReactGA.initialize(analyticsID);
} else {
	ReactGA.initialize(analyticsID, { debug: true, testMode: true });
}

const Index = props => (
	<Layout>
		<Vista />
	</Layout>
);

export default Index;
