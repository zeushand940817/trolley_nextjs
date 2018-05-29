import fetch from "isomorphic-unfetch";
import config from "../config.js";
import Hotspot from "../components/Hotspot.js";
import VideoHotspot from "../components/VideoHotspot.js";
import PointsList from "../components/PointsList.js";
import MarzipanoUI from "../components/MarzipanoUI.js";
import MarzipanoBrand from "../components/MarzipanoBrand.js";

class MarzipanoView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      scene: 0,
      scenes: [],
      curHotspots: [],
      activeKey: null,
      hotspotType: null,
      isRotating: false,
      autorotate: null,
      isGyroOn: false,
      viewer: null,
      view: null,
      deviceControl: null,
      controls: null,
      goTo: {
        yaw: 0,
        pitch: 0
      }
    };
  }

  componentDidMount() {
    this.startMarzipano();
  }

  componentDidUpdate() {}

  componentDidUpdate(prevProps, prevState) {
    //Movement updates
    if (prevState.goTo.yaw !== this.state.goTo.yaw) {
      let curscene = this.findScene(this.state.scenes, this.state.scene);
      console.log(curscene);
      curscene.scene.lookTo(this.state.goTo);
    }
    if (prevState.isRotating !== this.state.isRotating) {
      if (this.state.isRotating === false) {
        this.state.viewer.stopMovement();
      }
      if (this.state.isRotating === true) {
        this.state.viewer.startMovement(this.state.autorotate);
      }
    }

    //Scene updates
    if (prevState.scene !== this.state.scene) {
      this.setState({
        curHotspots: this.findScene(this.state.scenes, this.state.scene)
          .hotspots
      });
    }
  }

  componentWillUnmount() {
    //Destroy marzipano
  }

  startMarzipano() {
    const script = document.createElement("script");
    script.src = "./static/marzipano.js";

    script.onload = () => {
      let panoElement = this.divContainer;
      // Create viewer.
      let viewer = new Marzipano.Viewer(panoElement);

      //Start custom control
      this.startDeviceControl();

      let autorotate = Marzipano.autorotate({
        yawSpeed: 0.1, // Yaw rotation speed
        targetPitch: 0, // Pitch value to converge to
        targetFov: Math.PI / 2 // Fov value to converge to
      });

      let scenes = this.props.data.scenes.map(scene => {
        return this.createScene(scene, viewer);
      });

      this.setState({
        scenes: scenes,
        viewer: viewer,
        autorotate: autorotate
      });

      //Start with first scene
      scenes[this.state.scene].scene.switchTo();
      this.setState({ scene: scenes[this.state.scene].id });
    };

    document.body.appendChild(script);
    this.setState({ loaded: true });
  }

  startDeviceControl() {
    const control = document.createElement("script");
    control.src = "./static/devicecontrol.js";

    control.onload = () => {
      this.setState({ deviceControl: new DeviceOrientationControlMethod() });
      let controls = this.state.viewer.controls();
      controls.registerMethod("deviceOrientation", this.state.deviceControl);
    };

    document.body.appendChild(control);
  }

  createScene(scene, viewer) {
    // Create source.
    let source = Marzipano.ImageUrlSource.fromString(scene.tilesurl);

    // Create geometry.
    let geometry = new Marzipano.CubeGeometry([{ tileSize: 2000, size: 2000 }]);

    // Create view.
    let limiter = Marzipano.RectilinearView.limit.traditional(
      4096,
      (100 * Math.PI) / 180
    );
    let view = new Marzipano.RectilinearView(
      { yaw: (4 * Math.PI) / 180, pitch: 0, fov: 1.2 },
      limiter
    );

    // Create scene.
    let curscene = viewer.createScene({
      source: source,
      geometry: geometry,
      view: view,
      pinFirstLevel: true
    });

    this.setState({ view: view });

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
    this.setState({ scene: id });
  }

  toggleRotate() {
    if (this.state.isRotating === true) {
      this.setState({
        isRotating: false
      });
    } else {
      this.setState({ isRotating: true });
    }
  }

  toggleGyro() {
    let controls = this.state.viewer.controls();

    if (this.state.isGyroOn === true) {
      controls.disableMethod("deviceOrientation");
      this.setState({
        isGyroOn: false
      });
    } else {
      this.state.deviceControl.getPitch = (err, pitch) => {
        if (!err) {
          this.state.view.setPitch(pitch);
        }
      };

      controls.enableMethod("deviceOrientation");
      this.setState({ isGyroOn: true });
    }
  }

  getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    return { x: x, y: y };
  }

  handleClick(e) {
    if (process.env.NODE_ENV !== "production") {
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
      activeKey: null,
      hotspotType: null
    });
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
    });
  }

  render() {
    const panoStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden"
    };

    if (this.state.loaded === true) {
      return (
        <div>
          <div
            style={panoStyle}
            id="panorama"
            ref={container => {
              this.divContainer = container;
            }}
            onClick={this.handleClick.bind(this)}
          />
          {this.state.curHotspots.map(hotspot => <Hotspot
            type={hotspot.type}
            active={this.state.activeKey === hotspot.id ? true : false}
            onClick={this.hpState.bind(
              this,
              hotspot.id,
              hotspot.position,
              hotspot.type
            )}
            close={this.close.bind(this, hotspot.id)}
            scene={this.findScene(this.state.scenes, this.state.scene)}
            key={hotspot.id}
            title={hotspot.title}
            content={hotspot.content}
            data={hotspot.data}
            keyword={hotspot.keyword}
            position={hotspot.position}
          />)}

          <PointsList
            activeKey={this.state.activeKey}
            hotspots={this.state.curHotspots}
            setPos={this.setPos.bind(this)}
            hotspotType={this.state.hotspotType}
          />
          <MarzipanoBrand />
          <MarzipanoUI
            scenes={this.state.scenes}
            autorotate={this.state.isRotating}
            rotate={this.toggleRotate.bind(this)}
            activeScene={this.state.scene}
            switcher={this.switchScene.bind(this)}
            gyro={this.toggleGyro.bind(this)}
            isGyroOn={this.state.isGyroOn}
            goFull={this.props.goFull}
            isMobile={this.props.isMobile}
          />
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
