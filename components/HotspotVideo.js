import config from "../config.js";
import Modal from "../components/Modal.js";
import ModalContainer from "../components/ModalContainer.js";
import Gallery from "../components/Gallery.js";
import Video from "../components/Video.js";
import CloseButton from "../components/CloseButton.js";
import Point from "../components/Point.js";

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
    this.props.scene.scene.hotspotContainer().createHotspot(element, position);
  }

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <div className="trHotspot">
          <div
            className={
              this.props.active === true ? "hpcontent active" : "hpcontent"
            }
          >
            VIDEO
          </div>
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
          `}
        </style>
      </div>
    );
  }
}

export default HotspotVideo;
