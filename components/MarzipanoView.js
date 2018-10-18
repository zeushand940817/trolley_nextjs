import config from "../config.js";
import HotspotWrapper from "../components/HotspotWrapper.js";
import MarzipanoUI from "../components/MarzipanoUI.js";
import MarzipanoBrand from "../components/MarzipanoBrand.js";
import TextWindow from "../components/TextWindow.js";
import HotspotTitle from "../components/HotspotTitle.js";

class MarzipanoView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      scene: 0,
      sceneText: null,
      scenes: [],
      curHotspots: [],
      activeKey: null,
      activeTitle: null,
      hotspotType: null,
      isRotating: false,
      autorotate: null,
      isGyroOn: false,
      viewer: null,
      view: null,
      firstRun: true,
      deviceControl: null,
      controls: null,
      utiltext: null,
      goTo: {
        yaw: 0,
        pitch: 0
      }
    };
  }

  componentDidMount() {
    this.startMarzipano();
  }

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
    if (prevState.loaded !== this.state.loaded) {
      this.setState({ utiltext: this.props.data.utils.utiltext });
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
      this.switchScene(scenes[this.state.scene], 1);
      // scenes[this.state.scene].scene.switchTo();
      // this.setState({ scene: scenes[this.state.scene].id });
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
      text: scene.text,
      active: false
    };
  }

  findScene(scenes, sceneid) {
    return scenes.find(curscene => curscene.id === sceneid);
  }

  switchScene(scene, id) {
    let sceneTo = this.findScene(this.state.scenes, id);
    sceneTo.scene.switchTo();

    if (this.state.firstRun === true) {
      this.setState({
        scene: id,
        sceneText: sceneTo.text,
        activeKey: null
      });
      this.setState({ firstRun: false });
    } else {
      this.setState({
        scene: id,
        sceneText: sceneTo.text,
        activeKey: "scenetext-" + id
      });
    }
  }

  toggleHelpWindow() {
    this.setState({
      activeKey: this.state.activeKey === "infotext" ? null : "infotext"
    });
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
    console.log('hp-click');
    this.setPos(position, index, hotspotType);
  }

  close(index, event) {
    this.setState({
      activeKey: null,
      hotspotType: null
    });
  }

  showMenu() {
    this.setState({
      activeKey: this.state.activeKey === "menu" ? null : "menu"
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

  textWindowId() {
    return `scenetext-${this.state.scene}`;
  }

  renderTextWindow() {
    if (this.state.activeKey === this.textWindowId()) {
      return (
        <TextWindow
          id={this.textWindowId()}
          close={this.close.bind(this, "closeTextWindow")}
          content={this.state.sceneText}
          height={this.props.height}
        />
      );
    } else {
      return null;
    }
  }

  renderBrand() {
   return <MarzipanoBrand />
  }

  renderHelpWindow() {
    if (this.state.activeKey === "infotext") {
      return (
        <TextWindow
          id="infotext"
          close={this.close.bind(this, "closeInfoText")}
          content={this.state.utiltext}
          height={this.props.height}
        />
      );
    }
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
          {this.state.curHotspots.map(hotspot => (
            <HotspotWrapper
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
              id={hotspot.id}
              title={hotspot.title}
              content={hotspot.content}
              data={hotspot.data}
              keyword={hotspot.keyword}
              position={hotspot.position}
              height={this.props.height}
              gyro={this.state.isGyroOn}
            />
          ))}
          {this.renderTextWindow()}
          {this.renderHelpWindow()}

          {this.renderBrand()}
          <MarzipanoUI
            activeKey={this.state.activeKey}
            scenes={this.state.scenes}
            curHotspots={this.state.curHotspots}
            autorotate={this.state.isRotating}
            rotate={this.toggleRotate.bind(this)}
            hotspotType={this.state.hotspotType}
            activeScene={this.state.scene}
            switcher={this.switchScene.bind(this)}
            gyro={this.toggleGyro.bind(this)}
            isGyroOn={this.state.isGyroOn}
            goFull={this.props.goFull}
            showMenu={this.showMenu.bind(this)}
            isMobile={this.props.isMobile}
            toggleHelp={this.toggleHelpWindow.bind(this)}
            setPos={this.setPos.bind(this)}
            activeMenu={this.state.activeKey === "menu" ? true : false}
            hasGyro={this.props.hasGyro}
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
