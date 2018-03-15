import config from '../config.js';
import Modal from '../components/Modal.js';
import Gallery from '../components/Gallery.js';
import CloseButton from '../components/CloseButton.js';
import fetch from 'isomorphic-unfetch';
import Collage from '../components/Collage.js';

class Hotspot extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: false,
      isLoaded: false,
      error:null,
      items: []
    }
    //this.modalClick = this.modalClick.bind(this);
  }

  componentDidMount() {
    //Create hotspot function
    //console.log(this.hpDiv)
    this.createHotspot(this.hpDiv, this.props.position);
  }

  componentWillReceiveProps() {
    this.setState({
      isActive: this.props.active
    })
  }

  createHotspot(element, position) {
    this.props.scene.hotspotContainer().createHotspot(element, position);    
  }

  componentWillUnmount() {}

  render() {

    const hotspotType = (type) => {
      if(type === 'gallery') {
        return(<Gallery keyword={this.props.keyword ? this.props.keyword : null } />)
      } else if(type === 'video') {
        return(
          <iframe width="560" height="315" src={this.props.data.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>Cargando...</iframe>
          )
      } else if(type === 'collage') {
        return(
          <Collage data={this.props.data} />
          )
      }
    }
    
    const activeModal = () => {
      if(this.props.active === true) {
        return (<div>
                  <Modal close={<CloseButton onClick={this.props.close}/>} title={this.props.title} content={hotspotType(this.props.type)} type={this.props.type}> 
                    {this.props.content}
                  </Modal>
                </div>)
      }
    }

    return(
      <div>
      <div onClick={this.props.onClick} ref={hpDiv => {this.hpDiv = hpDiv}} className="trHotspot">
        <div className={this.props.active === true ? 'hpcontent active' : 'hpcontent'}>
            <h2 className="hptitle">{this.props.title}</h2>
        </div>
      </div>
      {activeModal()}
      <style jsx>
       {`
        .hpcontent {
            position: relative;
          }

        .hpcontent:hover .hptitle,
        .hpcontent.active .hptitle
         {
           background-color:#E34F35;
           color:white;
        }

        .hptitle {
          font-family:'Barrio', sans-serif;
          font-size: 18px;
          color:white;
          margin:0;
          transform: rotate3d(0, 0, 1,-25deg);
          background-color:#000;
          padding:6px;
          border-left:6px solid white;
          position: absolute;
          top:0;
          left:0;
          z-index:2;
        }
        `
       }
      </style>
      </div>
    )
  }
}

export default Hotspot
