import config from "../config.js";
import { Player } from "video-react";

class HotspotVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      isLoaded: false,
      error: null,
      items: []
    };
    //this.modalClick = this.modalClick.bind(this);
  }

  componentDidMount() {
    //Create hotspot function
    //console.log(this.hpDiv)
    this.createHotspot(this.hpDiv, this.props.position);
  }

  componentWillReceiveProps() {
    this.setState({
      isActive: this.props.active
    });
  }

  createHotspot(element, position) {
    this.props.scene.scene.hotspotContainer().createHotspot(element, position, {
      perspective: { radius: 1640, extraRotations: "rotateX(5deg)" }
    });
  }

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <div
          className="trHotspot"
          ref={hpDiv => {
            this.hpDiv = hpDiv;
          }}
        >
          <div
            className={
              this.props.active === true ? "hpcontent active" : "hpcontent"
            }
          >
            <div className="videoContainer">
              <Player src="./static/video/video_test_trolley.mp4" playsInline />
            </div>
          </div>
        </div>

        <style jsx>
          {`
            .videoContainer {
              background: url(./static/imgs/static.gif) repeat center;
              position: relative;
              width: 900px;
              height: 650px;
            }
            .hpcontent {
              position: relative;
            }

            .hpcontent:hover .hptitle,
            .hpcontent.active .hptitle {
              background-color: #e34f35;
              color: white;
            }
          `}
        </style>
      </div>
    );
  }
}

export default HotspotVideo;
