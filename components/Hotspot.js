import config from "../config.js";
import Modal from "../components/Modal.js";
import ModalContainer from "../components/ModalContainer.js";
import Gallery from "../components/Gallery.js";
import CloseButton from "../components/CloseButton.js";
import Point from "../components/Point.js";
import { CSSTransitionGroup } from "react-transition-group";
//import fetch from "isomorphic-unfetch";
//import Collage from "../components/Collage.js";

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
    const hotspotType = type => {
      if (type === "gallery") {
        return (
          <Gallery keyword={this.props.keyword ? this.props.keyword : null} />
        );
      } else {
        return (
          <Gallery keyword={this.props.keyword ? this.props.keyword : null} />
        );
      }
    };

    const activeModal = () => {
      if (this.props.active === true) {
        return (
          <ModalContainer
            className="animated"
            close={<CloseButton onClick={this.props.close} />}
            title={this.props.title}
            content={hotspotType(this.props.type)}
            type={this.props.type}
          >
            {this.props.content}
          </ModalContainer>
        );
      }
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
            <Point
              id={`${this.props.type}-${this.props.id}`}
              title={this.props.title}
            />
          </div>
        </div>
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
          transitionAppear={true}
        >
          {activeModal()}
        </CSSTransitionGroup>
        <style jsx>
          {`
            .example-appear {
              opacity: 0.01;
            }

            .example-appear.example-appear-active {
              opacity: 1;
              transition: opacity 0.5s ease-in;
            }
            .example-enter {
              opacity: 0.01;
            }

            .example-enter.example-enter-active {
              opacity: 1;
              transition: opacity 500ms ease-in;
            }

            .example-leave {
              opacity: 1;
            }

            .example-leave.example-leave-active {
              opacity: 0.01;
              transition: opacity 300ms ease-in;
            }
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
              display: none;
            }
          `}
        </style>
      </div>
    );
  }
}

export default Hotspot;
