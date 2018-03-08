import Layout from '../components/MyLayout.js';
import Link from 'next/link';
import data from '../data/dummy.json';

export default () => (
    <Layout>
      <div className="textContent">
          <p>{data.pages.about}</p>
      </div>
      <style jsx>{`
        .textContent {
          font-size:16px;
          max-width:800px;
          padding:12px;
          color:#f0f0f0;
        }
        `}</style>
    </Layout>
  )
