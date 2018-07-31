import config from "../config.js";
import { Player, LoadingSpinner, BigPlayButton, PlayToggle, ControlBar } from "video-react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faStepForward from "@fortawesome/fontawesome-free-solid/faStepForward";
import data_trolley from "../data/data_trolley_dspace.json";

class HotspotVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      isLoaded: false,
      curVideo: null,
      curVideoInfo: null,
      error: null,
      items: []
    };
    //this.modalClick = this.modalClick.bind(this);
    this.nextVid = this.nextVid.bind(this);
  }

  componentDidMount() {
    this.createHotspot(this.hpDiv, this.props.position);
    this.setState({
      curVideo: 0
    });
  }

  findVidInfo(id) {
    let info;
    for (let i = 0; i < data_trolley.length; i++) {
      if (data_trolley[i]["dc.identifier.other"] === id) {
        info = data_trolley[i];
      }
    }
    return info["dc.title"];
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

  getCurVidId() {
    if (this.state.curVideo !== null) {
      let id = this.props.content.videos[this.state.curVideo].id;
      return id;
    }
  }

  getCurVidTitle() {
    if (this.state.curVideo !== null) {
      let title = this.props.content.videos[this.state.curVideo].title;
      return title;
    }
  }

  getCurVid() {
    if (this.state.curVideo !== null) {
      let id = this.props.content.videos[this.state.curVideo].id;
      return this.props.content.videos[this.state.curVideo].url;
    }
  }

  getCurVidPoster() {
    if (this.state.curVideo !== null) {
      let id = this.props.content.videos[this.state.curVideo].id;
      return './static/video/' + id + '.png';
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
              <Player src={this.getCurVid()} playsInline fluid={false} preload="none" poster={this.getCurVidPoster()} width={900} height={670} >
                <LoadingSpinner />
                <BigPlayButton position="center" />
                <ControlBar autoHide={false} disableDefaultControls={true}>
                    <PlayToggle />
                </ControlBar>
              </Player>
              <h1 className="vidtitle">{this.getCurVidTitle()}</h1>
              <span className="nextvid nav_vids" onClick={this.nextVid}>
                <FontAwesomeIcon
                className="fa-fw"
                icon={faStepForward}
              />
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
            h1.vidtitle {
              font-size: 48px;
              text-align: center;
              font-family: 'Barrio', sans-serif;
              margin-bottom:0;
            }
            .nav_vids {
              font-size: 36px;
              text-align:center;
              display:block;
              padding: 12px 0;
              color: #e34f35;
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
