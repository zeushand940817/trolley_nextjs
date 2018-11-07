import ReactGA from "react-ga";

function trackPage(path, title) {

	ReactGA.set({
			path
		});
	ReactGA.pageview(path, [], title);
}

export default trackPage;