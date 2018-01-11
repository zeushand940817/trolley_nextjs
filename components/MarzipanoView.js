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
    console.log(data.scenes.length);
    let mzScenes = [];

    let panoElement = this.divContainer;

    // Create viewer.
    let viewer = new Marzipano.Viewer(panoElement);

    // Create source.
    let source = Marzipano.ImageUrlSource.fromString('./static/mztest_1.jpg');

    // Create geometry.
    let geometry = new Marzipano.EquirectGeometry([{width: 4000}]);

    // Create view.
    let limiter = Marzipano.RectilinearView.limit.traditional(
      1024,
      100 * Math.PI / 180,
    );
    let view = new Marzipano.RectilinearView({yaw: Math.PI}, limiter);

    for (let i = 0; i < data.scenes.length; i++) {
      console.log(data.scenes[i]);
      let mzsource = Marzipano.ImageUrlSource.fromString(
        './static/' + data.scenes[i].image,
      );
      mzScenes.push(
        viewer.createScene({
          source: mzsource,
          geometry: geometry,
          view: view,
          pinFirstLevel: true,
        }),
      );
    }
    // Create scene.
    let scene = viewer.createScene({
      source: source,
      geometry: geometry,
      view: view,
      pinFirstLevel: true,
    });

    // Display scene.
    //scene.switchTo();
    console.log(mzScenes);
    mzScenes[0].switchTo();
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
        <Hotspot />
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
