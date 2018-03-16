import fetch from 'isomorphic-unfetch';
import config from '../config.js';
import Hotspot from '../components/Hotspot.js';
import PointsList from '../components/PointsList.js';
import MarzipanoUI from '../components/MarzipanoUI.js';

class Panorama extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      scene: false,
      view: false,
      activeKey: 0,
      hotspotType: null,
      isRotating: false,
      autorotate: null,
      viewer: null,
      goTo: {
        yaw: 0,
        pitch: 0
      }
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
        view: view,
        viewer: viewer,
        autorotate: autorotate
      });

      //this.setState({scene: scene});
    }

    document.body.appendChild(script);
    
  }

  toggleRotate() {
     if(this.state.isRotating === true) {
        this.setState({
          isRotating: false
        })
     } else {
      this.setState({isRotating: true})
     }
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

  hpState(index, position, hotspotType, event) {
    this.setPos(position, index, hotspotType);
  }

  close(index, event) {
    this.setState({
      activeKey: 0,
      hotspotType: null
    })
  }

  setPos(position, hotspotid, type) {
    this.setState({
      goTo: {
        yaw: position.yaw,
        pitch: position.pitch
      },
      activeKey: hotspotid,
      isRotating: false,
      hotspotType: type
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.goTo.yaw !== this.state.goTo.yaw) {
      this.state.scene.lookTo(this.state.goTo);
    }
    if(prevState.isRotating !== this.state.isRotating) {
      if(this.state.isRotating === false) {
        this.state.viewer.stopMovement();
      }
      if(this.state.isRotating === true) {
       this.state.viewer.startMovement(this.state.autorotate);
      }
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
          <Hotspot  
                    type={hotspot.type}
                    active={this.state.activeKey === hotspot.id? true : false}
                    onClick={this.hpState.bind(this, hotspot.id, hotspot.position, hotspot.type)}
                    close={this.close.bind(this, hotspot.id)} 
                    scene={this.state.scene} 
                    key={hotspot.id} 
                    title={hotspot.title} 
                    content={hotspot.content}
                    data={hotspot.data} 
                    keyword={hotspot.keyword} 
                    position={hotspot.position}/>  
          ))}
          <PointsList 
                  activeKey={this.state.activeKey}
                  hotspots={this.props.hotspots}
                  setPos={this.setPos.bind(this)}
                  hotspotType={this.state.hotspotType}
                  
          />
          <MarzipanoUI autorotate={this.state.isRotating} rotate={this.toggleRotate.bind(this)}/>
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
