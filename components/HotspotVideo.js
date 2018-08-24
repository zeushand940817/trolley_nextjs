import config from "../config.js";
import {
  Player,
  LoadingSpinner,
  BigPlayButton,
  PlayToggle,
  ControlBar
} from "video-react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faStepForward from "@fortawesome/fontawesome-free-solid/faStepForward";
import faStepBackward from "@fortawesome/fontawesome-free-solid/faStepBackward";
import faCircle from "@fortawesome/fontawesome-free-solid/faCircle";
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
    this.prevVid = this.prevVid.bind(this);
  }

  componentDidMount() {
    this.createHotspot(this.hpDiv, this.props.position);
      this.setState({
        curVideo: 0,
        curVideoInfo: this.getCurVidTitle(0)
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
      let nextVid = prevVid + 1;
      this.setState({
        curVideo: nextVid,
        curVideoInfo: this.getCurVidTitle(nextVid)
      });
    }
  }

  prevVid() {
    if (this.state.curVideo !== 0) {
      let curVid = this.state.curVideo;
      let prevVid = curVid - 1;
      this.setState({
        curVideo: prevVid,
        curVideoInfo: this.getCurVidTitle(prevVid)
      });
    }
  }

  getCurVidId() {
    if (this.state.curVideo !== null) {
      let id = this.props.content.videos[this.state.curVideo].id;
      return id;
    }
  }

  getCurVidTitle(curVid) {
    let title = this.props.content.videos[curVid].title;
    return title;
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
      return config.assetsurl + "videos/" + id + ".png";
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
              <Player
                src={this.getCurVid()}
                playsInline
                fluid={false}
                preload="none"
                poster={this.getCurVidPoster()}
                width={522}
                height={370}
              >
                <LoadingSpinner />
                <BigPlayButton position="center" />
                <ControlBar autoHide={false} disableDefaultControls={true}>
                  <PlayToggle />
                </ControlBar>
              </Player>
              <h1 className="vidtitle">{this.state.curVideoInfo}</h1>

              <div className="videopager">
                <span className="prevvid nav_vids" onClick={this.prevVid}>
                  <FontAwesomeIcon className="fa-bw" icon={faStepBackward} />
                </span>
                {this.props.content.videos.map((video, key) => (
                  <span
                    className={
                      this.state.curVideo === key
                        ? "indicator active"
                        : "indicator"
                    }
                  >
                    <FontAwesomeIcon className="fa-circle" icon={faCircle} />
                  </span>
                ))}
                <span className="nextvid nav_vids" onClick={this.nextVid}>
                  <FontAwesomeIcon className="fa-fw" icon={faStepForward} />
                </span>
              </div>
            </div>
          </div>
        </div>

        <style jsx>
          {`
            .videoContainer {
              background: #333;
              position: relative;
              width: 522px;
              height: 383px;
              padding: 4px;
            }
            h1.vidtitle {
              font-size: 36px;
              text-align: center;
              font-family: "Special Elite", monospace;
              margin: 164px -80px 0 -80px;
              background-color: #333;
              padding: 4px;
            }
            .nav_vids {
              font-size: 36px;
              text-align: center;
              display: inline-block;
              padding: 12px 0;
              color: #e34f35;
              cursor: pointer;
              margin: 0 6px;
            }

            .nav_vids:hover {
              color: white;
            }

            .videopager {
              text-align: center;
            }

            .indicator {
              font-size: 36px;
              color: #e34f35;
              display: inline-block;
              padding: 5px;
            }

            .indicator.active {
              color: white;
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
