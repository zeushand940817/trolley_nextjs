
const startMarzipano = (container) => {
    let panoElement = container;

    // Create viewer.
    let viewer = new Marzipano.Viewer(panoElement);

    // Create source.
    let source = Marzipano.ImageUrlSource.fromString('./static/tiles/{f}.png');

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
    // Display scene.
    scene.switchTo();
  }

  export default startMarzipano;