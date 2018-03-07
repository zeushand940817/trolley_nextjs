import data from '../data/dummy.json';

class Hotspot extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    //Create hotspot function
    //console.log(this.hpDiv)
    this.createHotspot(this.hpDiv, this.props.position);
  }

  createHotspot(element, position) {
    this.props.scene.hotspotContainer().createHotspot(element, position);    
  }

  hpClick(e) {
    console.log(this.props.title);
  }

  componentWillUnmount() {}

  render() {
    return(
      <div>
      <div onClick={this.hpClick.bind(this)} ref={hpDiv => {this.hpDiv = hpDiv}} className="mz-hotspot">
        <span className="tick"></span>
        <div className="content">{this.props.title}</div>         
      </div>
      <style jsx>
       {
        `.mz-hotspot {
            font-weight:bold;
            color:white;
            padding:12px;
            border-radius:5px;
        }
        .content {
          display:none;
          background-color:#ccc;
        }
        .tick {
          display:block;
          width:12px;
          height:12px;
          border-radius:6px;
          background-color:red;
        }
        .tick:hover {
          background-color:blue;
        }
        `
       }
      </style>
      </div>
    )
  }
}

export default Hotspot
