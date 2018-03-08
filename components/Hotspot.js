class Hotspot extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visited: false
    }
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
  }

  componentWillUnmount() {}

  render() {
    return(
      <div>
      <div onClick={this.hpClick.bind(this)} ref={hpDiv => {this.hpDiv = hpDiv}} className="mz-hotspot">
        <div className="hpcontent">
            <h2 className="hptitle">{this.props.title}</h2>
            <div className="hpdesc">{this.props.content}</div>
        </div>
      </div>
      <style jsx>
       {`
        .hpcontent {
            position: relative;
          }
        
        .hpcontent:hover .hpdesc {
          opacity:1;
          transform: rotate3d(0, 0, 1, 5deg);
        }

        .hpcontent:hover .hptitle {
           border-left:6px solid #E34F35;
        }

        .hptitle {
          font-family:'Barrio', sans-serif;
          font-size: 24px;
          color:white;
          margin:0;
          transform: rotate3d(0, 0, 1,-25deg);
          background-color:#000;
          padding:6px;
          border-left:6px solid white;
          position: absolute;
          top:0;
          left:0;
          z-index:2;
        }
        .hpdesc {
          padding:20px 12px 12px 12px;
          margin:60px 0 0 60px;
          background-color:rgba(0,0,0, 0.5);
          color:white;
          position: absolute;
          left:12px;
          top:12px;
          width:260px;
          line-height:1.3em;
          z-index:1;
          transform: rotate3d(0, 0, 1, -25deg);
          opacity:0;
          pointer-events: none;
          transition: opacity 0.5s, transform 0.5s;
          border-top:1px solid white;
        }
        `
       }
      </style>
      </div>
    )
  }
}

export default Hotspot
