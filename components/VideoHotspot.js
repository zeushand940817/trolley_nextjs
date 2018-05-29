import config from "../config.js";
import Modal from "../components/Modal.js";
import ModalContainer from "../components/ModalContainer.js";
import Gallery from "../components/Gallery.js";
import CloseButton from "../components/CloseButton.js";
import fetch from "isomorphic-unfetch";

class VideoHotspot extends React.Component {
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
    const hotspotType = type => {
      if (type === "gallery") {
        return (
          <Gallery keyword={this.props.keyword ? this.props.keyword : null} />
        );
      }
    };

    return (
      <div>
        <div
          ref={hpDiv => {
            this.hpDiv = hpDiv;
          }}
          className="videoHotspot"
        >
          <div
            className={
              this.props.active === true ? "hpcontent active" : "hpcontent"
            }
          />
        </div>
        <style jsx>
          {`
            .hpcontent {
              position: relative;
            }

            .hpcontent:hover .hptitle,
            .hpcontent.active .hptitle {
              background-color: #e34f35;
              color: white;
            }

            .hptitle {
              font-family: "Barrio", sans-serif;
              font-size: 18px;
              color: white;
              margin: 0;
              transform: rotate3d(0, 0, 1, -25deg);
              background-color: #000;
              padding: 6px;
              border-left: 6px solid white;
              position: absolute;
              top: 0;
              left: 0;
              z-index: 2;
            }
          `}
        </style>
      </div>
    );
  }
}

export default VideoHotspot;
