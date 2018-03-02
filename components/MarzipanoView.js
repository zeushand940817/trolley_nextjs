import Hotspot from '../components/Hotspot.js';
import fetch from 'isomorphic-unfetch';
import config from '../config.js';

class Panorama extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scene: null
    }
  }

  startMarzipano() {
    let panoElement = this.divContainer;

    // Create viewer.
    let viewer = new Marzipano.Viewer(panoElement);

    // Create source.
    let source = Marzipano.ImageUrlSource.fromString(this.props.tilesurl);

    // Create geometry.
    let geometry = new Marzipano.CubeGeometry([{ tileSize: 2000, size: 2000}]);

    // Create view.
    let limiter = Marzipano.RectilinearView.limit.traditional(
      4096,
      100 * Math.PI / 180,
    );
    let view = new Marzipano.RectilinearView({yaw: 4 * Math.PI / 180}, limiter);

    // Create scene.
    let scene = viewer.createScene({
        source: source,
        geometry: geometry,
        view: view,
        pinFirstLevel: true
    });

    //Create hotspots
    let hotspots = this.props.hotspots;
    
    this.createHotspots(hotspots, scene);

    // Display scene.
    scene.switchTo();

    this.setState({scene: scene});
    
  }


  componentDidMount() {
    if(typeof window !== 'undefined') {
      //window.Marzipano = require('marzipano');
      this.startMarzipano();
    }
    
  }

  componentDidUpdate() {
    this.createHotspots();
  }

  createHotspots() {
    if(this.state.scene !== null) {
      let children = this.hpDiv.children;
      for(let i = 0; i < children.length; i++) {
        let position = this.props.hotspots[i].position;
        console.log(position);
        this.state.scene.hotspotContainer().createHotspot(children[i], position);
      }
    }
  }

  handleClick() { 
    //console.log(this);
  }

  componentWillUnmount() {
    //Destroy marzipano
  }

  render() {
    return (
      <div>
        <script type="text/javascript" src="./static/marzipano.js"></script>
        <div
          id="panorama"
          ref={container => {
            this.divContainer = container;
          }}
          onClick={this.handleClick.bind(this)}
        />
        <div ref={hpDiv => {
          this.hpDiv = hpDiv;
        }}>
        {this.props.hotspots.map((hotspot) => (
          <div key={hotspot.id} id={"hotspot-" + hotspot.id}>{hotspot.title}</div>
          ))}
        </div>
        <style jsx>{
          `#panorama {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%
            }`
          }
        </style>
      </div>
    );
  }
}

export default Panorama;
