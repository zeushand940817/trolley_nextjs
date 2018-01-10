////import Marzipano from 'marzipano'

class Panorama extends React.Component {
  constructor(props) {
    super(props)
    this.state = {ref: "divPanorama"}
  }

  componentDidMount() {
    let panoElement = this.divContainer

    // Create viewer.
    let viewer = new Marzipano.Viewer(panoElement);

    // Create source.
    let source = Marzipano.ImageUrlSource.fromString(
      "./static/mztest_1.jpg"
    );

    // Create geometry.
    let geometry = new Marzipano.EquirectGeometry([{ width: 4000 }]);

    // Create view.
    let limiter = Marzipano.RectilinearView.limit.traditional(1024, 100*Math.PI/180);
    let view = new Marzipano.RectilinearView({ yaw: Math.PI }, limiter);

    // Create scene.
    let scene = viewer.createScene({
      source: source,
      geometry: geometry,
      view: view,
      pinFirstLevel: true
    });

    // Display scene.
    scene.switchTo();

   
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div id="panorama">
      <div style={{backgroundColor:'red', minHeight: '400px'}} ref={(container) => { this.divContainer = container}} >
      </div>
      </div>
    );
  }
}

export default Panorama 
