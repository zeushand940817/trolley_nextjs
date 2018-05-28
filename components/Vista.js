import Layout from "./MyLayout.js";
import Link from "next/link";
import MarzipanoView from "./MarzipanoView.js";
import Fullscreen from "react-full-screen";

import data from "../data/dummy.json";

class Vista extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: "0", height: "0", isFull: false };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.goFull = this.goFull.bind(this);
  }

  goFull() {
    this.setState({ isFull: this.state.isFull === true ? false : true });
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    return (
      <div>
        <div className="panoWrapper">
          <Fullscreen
            enabled={this.state.isFull}
            onChange={isFull => this.setState({ isFull })}
          >
            <MarzipanoView data={data} goFull={this.goFull} />
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
