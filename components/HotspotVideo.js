import config from "../config.js";
import { Player } from "video-react";
import data_trolley from "../data/data_trolley_dspace.json";

class HotspotVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      isLoaded: false,
      curVideo: null,
      error: null,
      items: []
    };
    //this.modalClick = this.modalClick.bind(this);
    this.nextVid = this.nextVid.bind(this);
  }

  componentDidMount() {
    //Create hotspot function
    //console.log(this.hpDiv)
    this.createHotspot(this.hpDiv, this.props.position);
    this.setState({
      curVideo: 0
    });
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

  nextVid() {
    if (this.state.curVideo + 1 !== this.props.content.videos.length) {
      let prevVid = this.state.curVideo;
      this.setState({ curVideo: prevVid + 1 });
    } else {
      this.setState({ curVideo: 0 });
    }
  }

  getCurVid() {
    if (this.state.curVideo !== null) {
      return this.props.content.videos[this.state.curVideo].url;
    }
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
              <Player src={this.getCurVid()} playsInline />
              <span className="nextvid nav_vids" onClick={this.nextVid}>
                Siguiente
              </span>
            </div>
          </div>
        </div>

        <style jsx>
          {`
            .videoContainer {
              background: #333;
              position: relative;
              width: 900px;
              height: 650px;
              padding: 24px;
            }
            .nav_vids {
              font-size: 72px;
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
