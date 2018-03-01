import Layout from '../components/MyLayout.js';
import Link from 'next/link';
import Panorama from '../components/MarzipanoView.js';
import data from '../data/dummy.json';

const Vista = props => (
  <Layout>
    <h1>Vista 360</h1>
    <div className="panoWrapper">
      <Panorama tilesurl={data.tilesurl} hotspots={data.hotspots}/>

    </div>
    <style jsx>{`
      .panoWrapper {
        position:relative;
        height:600px;
      }
    `}</style>
  </Layout>
);

export default Vista;
