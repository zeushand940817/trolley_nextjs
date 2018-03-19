import Layout from '../components/MyLayout.js';
import Link from 'next/link';
import Panorama from '../components/MarzipanoView.js';
import data from '../data/dummy.json';

class Vista extends React.Component {
constructor(props) {
  super(props);
  this.state = { width: '0', height: '0' };
  this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
}

componentDidMount() {
  this.updateWindowDimensions();
  window.addEventListener('resize', this.updateWindowDimensions);
}

componentWillUnmount() {
  window.removeEventListener('resize', this.updateWindowDimensions);
}

updateWindowDimensions() {
  this.setState({ width: window.innerWidth, height: window.innerHeight });
}

  render() {
    return(
     <Layout>
     <div className="panoWrapper">
     <Panorama scenes={data.scenes} />

     </div>
     <style jsx>{`
      .panoWrapper {
        position:relative;
        height:${this.state.height - 60}px;
        margin-top:20px;
        overflow:hidden;
      }
      `}</style>
      </Layout>
      )
  }
}

export default Vista;
