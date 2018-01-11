import Layout from '../components/MyLayout.js';
import Link from 'next/link';
import Panorama from '../components/MarzipanoView.js';

const Vista = props => (
  <Layout>
    <h1>Vista 360</h1>
    <div className="panoWrapper">
      <Panorama />
    </div>
    <style jsx>{`
      .panoWrapper {
      }
    `}</style>
  </Layout>
);

export default Vista;
