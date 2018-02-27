////import Marzipano from 'marzipano'
import Hotspot from '../components/Hotspot.js';
import fetch from 'isomorphic-unfetch';
import config from '../config.js';
import data from '../data/dummy.json';

class Panorama extends React.Component {
  constructor(props) {
    super(props);
    this.state = {ref: 'divPanorama'};
  }

  componentDidMount() {

    let panoElement = this.divContainer;

    // Create viewer.
    let viewer = new Marzipano.Viewer(panoElement);

    // Create source.
    let source = Marzipano.ImageUrlSource.fromString('./static/tiles/{f}.jpg');

    // Create geometry.
    let geometry = new Marzipano.CubeGeometry([{ tileSize: 2000, size: 2000}]);

    // Create view.
    let limiter = Marzipano.RectilinearView.limit.traditional(
      4096,
      100 * Math.PI / 180,
    );
    let view = new Marzipano.RectilinearView({yaw: Math.PI}, limiter);

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

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <div
          id="panorama"
          ref={container => {
            this.divContainer = container;
          }}
        />
        <style jsx>
          {`
            #panorama {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
            }
          `}
        </style>
      </div>
    );
  }
}

export default Panorama;
