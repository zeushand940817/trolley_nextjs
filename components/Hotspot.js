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
          {this.props.title}         
      </div>
      <style jsx>
       {
        `.mz-hotspot {
            font-weight:bold;
            color:white;
            background-color:#ccc;
            padding:12px;
            border-radius:5px;
        }`
       }
      </style>
      </div>
    )
  }
}

export default Hotspot
