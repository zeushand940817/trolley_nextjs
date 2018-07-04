import HotspotVideo from "../components/HotspotVideo.js";
import Hotspot from "../components/Hotspot.js";

class HotspotWrapper extends React.Component {
	constructor(props) {
		super(props);
	}

	getType() {
		if (this.props.type === "video") {
			return <HotspotVideo {...this.props} />;
		} else if (this.props.type === "gallery") {
			return <Hotspot {...this.props} />;
		} else {
			return <Hotspot {...this.props} />;
		}
	}

	render() {
		return <div>{this.getType()}</div>;
	}
}

export default HotspotWrapper;
