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

      let autorotate = Marzipano.autorotate({
        yawSpeed: 0.1,         // Yaw rotation speed
        targetPitch: 0,        // Pitch value to converge to
        targetFov: Math.PI/2   // Fov value to converge to
      });

      // Autorotate will start after 1s of idle time
      viewer.setIdleMovement(10000, autorotate);  
      // Disable idle movement
      //viewer.setIdleMovement(Infinity);

      // Start autorotation immediately
      viewer.startMovement(autorotate); 

      // Create source.
      let source = Marzipano.ImageUrlSource.fromString(this.props.tilesurl);

      // Create geometry.
      let geometry = new Marzipano.CubeGeometry([{ tileSize: 2000, size: 2000}]);

      // Create view.
      let limiter = Marzipano.RectilinearView.limit.traditional(
        4096,
        100 * Math.PI / 180,
      );
      let view = new Marzipano.RectilinearView({yaw: 4 * Math.PI / 180, pitch: 0, fov: 1.2}, limiter);

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
    //console.log(this.state.view.size())
  }

  getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    return {x: x, y: y};
  }

  handleClick(e) { 
    if(process.env.NODE_ENV !== 'production') {
      let position = this.getCursorPosition(this.divContainer, e);
      let coords = this.state.view.screenToCoordinates(position);
      console.log(coords);
    }
  }

  componentWillUnmount() {
    //Destroy marzipano
  }

  render() {
    const panoStyle = {
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              overflow: "hidden"
            }
    
    if(this.state.loaded == true) {
    return (
      <div>
        <div style={panoStyle}
          id="panorama"
          ref={container => {
            this.divContainer = container;
          }}
          onClick={this.handleClick.bind(this)}
        />
        {this.props.hotspots.map((hotspot) => (
          <Hotspot loaded={this.state.loaded} scene={this.state.scene} key={"hotspot-" + hotspot.id} title={hotspot.title} content={hotspot.content} position={hotspot.position}/>  
          ))}
        <style global jsx>{`
          .panoWrapper {
            height: ${this.state.innerHeight}px !important;
          }
        `}</style>
      </div>
      
    );
  } else {
    return (
    <div> 
      <div
          style={panoStyle}
          id="panorama"
          ref={container => {
            this.divContainer = container;
          }}
        />
      <div>Cargando...</div>
        </div>
      );
  }
  }
}

export default Panorama;
