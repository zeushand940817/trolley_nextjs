import config from "../config.js";
import Modal from "../components/Modal.js";
import ModalContainer from "../components/ModalContainer.js";
import Gallery from "../components/Gallery.js";
import CloseButton from "../components/CloseButton.js";
import Point from "../components/Point.js";

class Hotspot extends React.Component {
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
    const PointTitle = this.props.title.length > 23 ? this.props.title.substring(0, 23) + '...' : this.props.title;

    const activeModal = () => {
      if (this.props.active === true) {
        return (
          <ModalContainer
            top={60}
            className="animated"
            close={<CloseButton onClick={this.props.close} />}
            title={this.props.title}
            type={this.props.type}
          >
            <Gallery keyword={this.props.keyword ? this.props.keyword : null} />
          </ModalContainer>
        );
      }
    };

    const marker = () => {
      return (
        <Point
          hpid={this.props.id}
          id={`${this.props.type}-${this.props.id}`}
          title={PointTitle}
          stopped={this.props.gyro}
        />
      );
    };

    return (
      <div>
        <div
          onClick={this.props.onClick}
          ref={hpDiv => {
            this.hpDiv = hpDiv;
          }}
          className="trHotspot"
        >
          <div
            className={
              this.props.active === true ? "hpcontent active" : "hpcontent"
            }
          >
            {marker()}
          </div>
        </div>

        {activeModal()}

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

export default Hotspot;
