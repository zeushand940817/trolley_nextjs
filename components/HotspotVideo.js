import config from "../config.js";
import {
  Player,
  LoadingSpinner,
  BigPlayButton,
  PlayToggle,
  ControlBar
} from "video-react";
import { Fragment } from "react";
import Tappable from "react-tappable/lib/Tappable";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faChevronRight from "@fortawesome/fontawesome-free-solid/faChevronRight";
import faStop from "@fortawesome/fontawesome-free-solid/faStop";
import faPause from "@fortawesome/fontawesome-free-solid/faPause";
import faPlay from "@fortawesome/fontawesome-free-solid/faPlay";
import faChevronLeft from "@fortawesome/fontawesome-free-solid/faChevronLeft";
import faArrowsAlt from "@fortawesome/fontawesome-free-solid/faArrowsAlt";
import ModalVideo from "../components/ModalVideo.js";
import CloseButton from "../components/CloseButton.js";

import data_trolley from "../data/data_trolley_dspace.json";

class HotspotVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      isPlaying: false,
      isPaused: false,
      isLoaded: false,
      curVideo: null,
      curVideoInfo: null,
      curMargin: 0,
      error: null,
      items: [],
      player: null,
      currentTime: null
    };
    //this.modalClick = this.modalClick.bind(this);
    this.nextVid = this.nextVid.bind(this);
    this.prevVid = this.prevVid.bind(this);
    this.startPlayer = this.startPlayer.bind(this);
    this.stopVid = this.stopVid.bind(this);
    this.pauseVid = this.pauseVid.bind(this);
    this.fullVideo = this.fullVideo.bind(this);
  }

  componentDidMount() {
    this.createHotspot(this.hpDiv, this.props.position);
    this.setState({
      curVideo: 0,
      curVideoInfo: this.getCurVidTitle(0)
    });
    //this.vidPlayer.subscribeToStateChange(this.handleStateChange.bind(this));
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

  fullVideo() {
    this.setState({
      fullScreen: this.state.fullScreen ? false : true,
      isPlaying: false,
      isPaused: false
    });
  }

  componentWillReceiveProps() {
    this.setState({
      isActive: this.props.active
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.isPaused !== this.state.isPaused &&
      this.refs.player !== undefined
    ) {
      if (this.state.isPaused) {
        this.refs.player.pause();
      } else {
        this.refs.player.play();
      }
    }

    if(prevProps.active !== this.props.active || prevProps.scene !== this.props.scene) {
      if(!this.props.active && this.refs.player !== undefined) {
        this.refs.player.pause();
      }
    }
  }

  createHotspot(element, position) {
    this.props.scene.scene.hotspotContainer().createHotspot(element, position, {
      perspective: { radius: 1640, extraRotations: "rotateX(5deg)" }
    });
  }

  calculateMargin(multiplier) {
    return `-${multiplier * 522}px`;
  }

  nextVid() {
    let prevVid = this.state.curVideo;
    if (this.state.curVideo + 1 !== this.props.content.videos.length) {
      let nextVid = prevVid + 1;
      this.setState({
        curVideo: nextVid,
        curVideoInfo: this.getCurVidTitle(nextVid),
        curMargin: this.calculateMargin(nextVid)
      });
    } else {
      this.setState({
        curVideo: 0,
        curVideoInfo: this.getCurVidTitle(0),
        curMargin: 0
      });
    }
  }

  prevVid() {
    let curVid = this.state.curVideo;
    if (this.state.curVideo !== 0) {
      let prevVid = curVid - 1;
      this.setState({
        curVideo: prevVid,
        curVideoInfo: this.getCurVidTitle(prevVid),
        curMargin: this.calculateMargin(prevVid)
      });
    } else {
      let prevVid = this.props.content.videos.length - 1;
      this.setState({
        curVideo: prevVid,
        curVideoInfo: this.getCurVidTitle(prevVid),
        curMargin: this.calculateMargin(prevVid)
      });
    }
  }

  startPlayer() {
    this.setState({
      isPlaying: true,
      isPaused: false
    });
    this.props.activateKey(this.props.id, this.props.position);
  }

  stopVid() {
    this.setState({
      isPlaying: false,
      isPaused: false
    });
    this.props.deactivateKey();
  }

  pauseVid() {
    if (this.state.isPaused === true) {
      this.setState({ isPaused: false });
    } else {
      this.setState({ isPaused: true });
    }
  }

  handleStateChange(state, prevState) {
    // copy player state to this component's state
    this.setState({
      player: state,
      currentTime: state.currentTime
    });
  }

  getCurVidId() {
    if (this.state.curVideo !== null) {
      let id = this.props.content.videos[this.state.curVideo].id;
      return id;
    }
  }

  getCurVidTitle(curVid) {
    let title = this.props.content.videos[curVid].title;
    console.log(title);
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
      return config.assetsurl + "videos/" + id + ".jpg";
    }
  }

  componentWillUnmount() {}

  render() {
    const fullVideo = () => {
      if (this.state.fullScreen === true) {
        return (
          <ModalVideo
            top={60}
            className="animated"
            close={<CloseButton type="video" onClick={this.fullVideo} />}
            title={this.props.title}
            type={this.props.type}
            height={this.props.height}
          >
            <h2>{this.getCurVidTitle(this.state.curVideo)}</h2>
            <Player
              className="fullVideo"
              ref="playerFull"
              poster={this.getCurVidPoster()}
              src={this.getCurVid()}
              preload="auto"
              autoPlay
            >
              <BigPlayButton position="center" />
              <LoadingSpinner />
              <ControlBar />
            </Player>
          </ModalVideo>
        );
      }
    };
    return (
      <div>
        <div>{fullVideo()}</div>
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
              {!this.state.isPlaying ? (
                <div
                  className="videoNav"
                  style={{ marginLeft: this.state.curMargin }}
                >
                  {this.props.content.videos.map((video, key) => (
                    <Tappable onTap={this.startPlayer} key={key}>
                      <div className="videoTile">
                        <img
                          draggable={false}
                          src={`${config.assetsurl}videos/${video.id}.png`}
                          title={video.title}
                        />
                      </div>
                    </Tappable>
                  ))}
                </div>
              ) : (
                <div className="player">
                  <Player
                    ref="player"
                    poster={this.getCurVidPoster()}
                    src={this.getCurVid()}
                    preload="auto"
                    autoPlay
                    width={522}
                    height={383}
                    playsInline={false}
                  >
                    <BigPlayButton disabled />
                    <LoadingSpinner />
                    <ControlBar disabled disableCompletely={true} />
                  </Player>
                </div>
              )}
            </div>
            <div className="videoPager">
              <span className="status">
                {this.state.curVideo + 1} / {this.props.content.videos.length}
              </span>
              {!this.state.isPlaying ? (
                <Fragment>
                  <Tappable onTap={this.prevVid}>
                    <span className="prev">
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </span>
                  </Tappable>
                  <Tappable onTap={this.nextVid}>
                    <span className="next">
                      <FontAwesomeIcon icon={faChevronRight} />
                    </span>
                  </Tappable>
                </Fragment>
              ) : (
                <div className="videoControls">
                  <Tappable onTap={this.pauseVid}>
                    <span className="pause">
                      {this.state.isPaused ? (
                        <FontAwesomeIcon icon={faPlay} />
                      ) : (
                        <FontAwesomeIcon icon={faPause} />
                      )}
                    </span>
                  </Tappable>
                  <Tappable onTap={this.stopVid}>
                    <span className="stop">
                      <FontAwesomeIcon icon={faStop} />
                    </span>
                  </Tappable>
                  <Tappable onTap={this.fullVideo}>
                    <span className="fullScreen">
                      <FontAwesomeIcon icon={faArrowsAlt} />
                    </span>
                  </Tappable>
                </div>
              )}
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
              overflow: hidden;
            }

            .videoNav {
              display: flex;
              transition: margin ease-in 0.3s;
            }

            .videoTile {
              flex-shrink: 0;
              width: 522px;
              height: 383px;
              overflow: hidden;
            }

            .videoTile img {
              max-width: 100%;
              height: auto;
              user-drag: none;
            }

            .videoPager span {
              display: block;
              padding: 12px;
              font-size: 24px;
              background-color: #333;
              color: white;
            }

            .videoPager span:hover {
              cursor: pointer;
              background-color: #fa0307;
            }

            .videoPager .next {
              right: -36px;
              top: 150px;
              position: absolute;
            }

            .videoPager .prev {
              left: -36px;
              top: 150px;
              position: absolute;
            }

            .videoPager .status {
              position: absolute;
              top: 0;
              left: -32px;
              background-color: #fa0307;
              color: white;
              font-family: "Special Elite", monospace;
              transform: rotate(-5deg);
              display: block;
              padding: 6px;
              font-size: 24px;
            }

            .videoControls {
              position: absolute;
              right: 0;
              bottom: 0;
              display: flex;
            }

            .videoControls .stop,
            .videoControls .pause {
              display: block;
              padding: 6px 12px;
              color: white;
              font-size: 24px;
            }

            .videoControls .fullScreen {
              padding: 6px 12px;
              color: white;
              font-size: 24px;
            }

            .videoControls span {
              background-color: #000;
            }

            .videoControls span:hover {
              background-color: #fa0307;
            }

            .fullVideo {
              width: 100%;
              height: auto;
              max-height: 100vh;
            }

            .playButton {
            }
          `}
        </style>
      </div>
    );
  }
}

export default HotspotVideo;
