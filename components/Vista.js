import Layout from "./MyLayout.js";
import Link from "next/link";
import MarzipanoView from "./MarzipanoView.js";
import Fullscreen from "react-full-screen";

import data from "../data/dummy.json";

class Vista extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: "0",
      height: "0",
      isFull: false,
      isMobile: false,
      hasGyro: false
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.goFull = this.goFull.bind(this);
    //this.setGyro = this.setGyro.bind(this);
  }

  goFull() {
    this.setState({ isFull: this.state.isFull === true ? false : true });
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    //window.addEventListener("devicemotion", this.setGyro.bind(this, event));
  }

  setGyro(event) {
    console.log(event.current);
    if (event.rotationRate) {
      if (
        event.rotationRate.alpha ||
        event.rotationRate.beta ||
        event.rotationRate.gamma
      ) {
        this.setState({ hasGyro: true });
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.width !== prevState.width) {
      let isMobile = this.state.width < 1025 ? true : false;
      this.setState({ isMobile: isMobile , hasGyro: isMobile });
    }
  }

  render() {
    return (
      <div>
        <div className="panoWrapper">
          <Fullscreen
            enabled={this.state.isFull}
            onChange={isFull => this.setState({ isFull })}
          >
            <MarzipanoView
              data={data}
              goFull={this.goFull}
              isMobile={this.state.isMobile}
              height={this.state.height}
              hasGyro={this.state.hasGyro}
            />
          </Fullscreen>
        </div>
        <style jsx>{`
          .panoWrapper {
            position: relative;
            height: ${this.state.height}px;
            margin-top: 0;
            overflow: hidden;
          }
        `}</style>
      </div>
    );
  }
}

export default Vista;
