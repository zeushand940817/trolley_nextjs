import fetch from 'isomorphic-unfetch';
import config from '../config.js';
import Hotspot from '../components/Hotspot.js';
import PointsList from '../components/PointsList.js';
import MarzipanoUI from '../components/MarzipanoUI.js';

class MarzipanoView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      scene: 1,
      scenes: [],
      curHotspots: [],
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

  componentDidMount() {
      this.startMarzipano();
      console.log(this.props);
  }

  componentDidUpdate() {
  }

  componentDidUpdate(prevProps, prevState) {
    //Movement updates
    if(prevState.goTo.yaw !== this.state.goTo.yaw) {
      let curscene = this.findScene(this.state.scenes, this.state.scene);
      console.log(curscene);
      curscene.scene.lookTo(this.state.goTo);
    }
    if(prevState.isRotating !== this.state.isRotating) {
      if(this.state.isRotating === false) {
        this.state.viewer.stopMovement();
      }
      if(this.state.isRotating === true) {
       this.state.viewer.startMovement(this.state.autorotate);
      }
    }

    //Scene updates
    if(prevState.scene !== this.state.scene) {
      this.setState({ curHotspots: this.findScene(this.state.scenes, this.state.scene).hotspots})
    }
  }

  componentWillUnmount() {
    //Destroy marzipano
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

      let scenes = this.props.data.scenes.map((scene) => {
        return this.createScene(scene, viewer);
      });

      this.setState({
        scenes: scenes,
        viewer: viewer,
        autorotate: autorotate
      });

      //Start with first scene
      scenes[this.state.scene].scene.switchTo();
      this.setState({scene: scenes[this.state.scene].id});
    }

    document.body.appendChild(script);
    this.setState({loaded: true});
  }

rotateEuler(euler, result) {
  var heading, bank, attitude,
    ch = Math.cos(euler.yaw),
    sh = Math.sin(euler.yaw),
    ca = Math.cos(euler.pitch),
    sa = Math.sin(euler.pitch),
    cb = Math.cos(euler.roll),
    sb = Math.sin(euler.roll),

    matrix = [
      sh*sb - ch*sa*cb,   -ch*ca,    ch*sa*sb + sh*cb,
      ca*cb,              -sa,      -ca*sb,
      sh*sa*cb + ch*sb,    sh*ca,   -sh*sa*sb + ch*cb
    ]; // Includes 90-degree rotation around z axis

  /* [m00 m01 m02] 0 1 2
   * [m10 m11 m12] 3 4 5
   * [m20 m21 m22] 6 7 8 */

  if (matrix[3] > 0.9999)
  {
    // Deal with singularity at north pole
    heading = Math.atan2(matrix[2],matrix[8]);
    attitude = Math.PI/2;
    bank = 0;
  }
  else if (matrix[3] < -0.9999)
  {
    // Deal with singularity at south pole
    heading = Math.atan2(matrix[2],matrix[8]);
    attitude = -Math.PI/2;
    bank = 0;
  }
  else
  {
    heading = Math.atan2(-matrix[6],matrix[0]);
    bank = Math.atan2(-matrix[5],matrix[4]);
    attitude = Math.asin(matrix[3]);
  }

  result.yaw = heading;
  result.pitch = attitude;
  result.roll = bank;
}

  createScene(scene, viewer) {

      // Create source.
      let source = Marzipano.ImageUrlSource.fromString(scene.tilesurl);

      // Create geometry.
      let geometry = new Marzipano.CubeGeometry([{ tileSize: 2000, size: 2000}]);

      // Create view.
      let limiter = Marzipano.RectilinearView.limit.traditional(
        4096,
        100 * Math.PI / 180,
      );
      let view = new Marzipano.RectilinearView({yaw: 4 * Math.PI / 180, pitch: 0, fov: 1.2}, limiter);

      // Create scene.
      let curscene = viewer.createScene({
          source: source,
          geometry: geometry,
          view: view,
          pinFirstLevel: true
      });

      
      // Display scene.
      //scene.switchTo();
      //console.log(curscene);
      return {
        scene: curscene,
        view: view,
        title: scene.title,
        id: scene.id,
        hotspots: scene.hotspots,
        active: false
      };
  }

  findScene(scenes, sceneid) {
    return scenes.find(curscene => curscene.id === sceneid);
  }

  switchScene(scene, id) {
    this.findScene(this.state.scenes, id).scene.switchTo();
    this.setState({scene: id});
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

  getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    return {x: x, y: y};
  }

  handleClick(e) { 
    if(process.env.NODE_ENV !== 'production') {
      let position = this.getCursorPosition(this.divContainer, e);
      let curScene = this.findScene(this.state.scenes, this.state.scene);
      let coords = curScene.view.screenToCoordinates(position);
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

  render() {
    const panoStyle = {
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              overflow: "hidden"
            }

    if(this.state.loaded === true) {

    return (
      <div>
        <div style={panoStyle}
          id="panorama"
          ref={container => {
            this.divContainer = container;
          }}
          onClick={this.handleClick.bind(this)}
        />
        {this.state.curHotspots.map((hotspot) => (
          <Hotspot  
                    type={hotspot.type}
                    active={this.state.activeKey === hotspot.id? true : false}
                    onClick={this.hpState.bind(this, hotspot.id, hotspot.position, hotspot.type)}
                    close={this.close.bind(this, hotspot.id)} 
                    scene={this.findScene(this.state.scenes, this.state.scene)} 
                    key={hotspot.id} 
                    title={hotspot.title} 
                    content={hotspot.content}
                    data={hotspot.data} 
                    keyword={hotspot.keyword} 
                    position={hotspot.position}/>
          ))}

          <PointsList 
                  activeKey={this.state.activeKey}
                  hotspots={this.state.curHotspots}
                  setPos={this.setPos.bind(this)}
                  hotspotType={this.state.hotspotType}
                  
          />
          <MarzipanoUI scenes={this.state.scenes} autorotate={this.state.isRotating} rotate={this.toggleRotate.bind(this)} activeScene={this.state.scene} switcher={this.switchScene.bind(this)}/>
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

export default MarzipanoView;
