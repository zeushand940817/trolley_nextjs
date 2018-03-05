import fetch from 'isomorphic-unfetch';
import config from '../config.js';
import Hotspot from '../components/Hotspot.js';

class Panorama extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      scene: false,
      view: false
    }
  }

  startMarzipano() {
    const script = document.createElement('script');
    script.src = "./static/marzipano.js";

    script.onload = () => {

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
      

      // Display scene.
      scene.switchTo();

      this.setState({
        loaded: true,
        scene: scene,
        view: view
      });

      //this.setState({scene: scene});
    }

    document.body.appendChild(script);
    
  }


  componentDidMount() {
      //window.Marzipano = require('marzipano');
      this.startMarzipano();
  }

  componentDidUpdate() {
  }

  getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    return {x: x, y: y};
  }

  handleClick(e) { 
    let position = this.getCursorPosition(this.divContainer, e);
    let coords = this.state.view.screenToCoordinates(position);
    console.log(coords);
  }

  componentWillUnmount() {
    //Destroy marzipano
  }

  render() {
    if(this.state.loaded == true) {
    return (
      <div>
        <div
          id="panorama"
          ref={container => {
            this.divContainer = container;
          }}
        />
        {this.props.hotspots.map((hotspot) => (
          <Hotspot loaded={this.state.loaded} scene={this.state.scene} key={"hotspot-" + hotspot.id} title={hotspot.title} position={hotspot.position}/>  
          ))}
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
  } else {
    return (
    <div> 
      <div
          id="panorama"
          ref={container => {
            this.divContainer = container;
          }}
          onClick={this.handleClick.bind(this)}
        />
      <div>Cargando...</div>
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
}

export default Panorama;
