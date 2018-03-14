import config from '../config.js';
import data_trolley from '../data/data_trolley.json'; 
import Modal from '../components/Modal.js';
import Gallery from '../components/Gallery.js';
import CloseButton from '../components/CloseButton.js';
import fetch from 'isomorphic-unfetch';

class Hotspot extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: false,
      isLoaded: false,
      error:null,
      items: []
    }
    this.modalClick = this.modalClick.bind(this);
  }

  componentDidMount() {
    //Create hotspot function
    //console.log(this.hpDiv)
    this.createHotspot(this.hpDiv, this.props.position);
  }

  createHotspot(element, position) {
    this.props.scene.hotspotContainer().createHotspot(element, position);    
  }

  hpClick(e) {
    this.setState({
      isActive: true
    });
    if(process.env.NODE_ENV !== 'production') {
      this.setState({
        isLoaded: true,
        items: data_trolley
      })
    } else {
       fetch(config.trolleydataurl)
      .then(res => res.json())
      .then(
          (result) => {
            console.log(result);
            this.setState({
              isLoaded: true,
              items: result
            })
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            })
          }
        )
    }
  }

  modalClick(e) {
    this.setState({
      isActive: false
    })
  }

  componentWillUnmount() {}

  render() {
    
    const activeModal = () => {
      if(this.state.isActive === true) {
        return (<div>
                  <Modal title={this.props.title}> 
                    {this.props.content}
                    <Gallery keyword={this.props.keyword ? this.props.keyword : null } data={this.state.items} />
                    <CloseButton onClick={this.modalClick.bind(this)}/> 
                  </Modal>
                </div>)
      }
    }

    return(
      <div>
      <div onClick={this.hpClick.bind(this)} ref={hpDiv => {this.hpDiv = hpDiv}} className="trHotspot">
        <div className="hpcontent">
            <h2 className="hptitle">{this.props.title}</h2>
        </div>
      </div>
      {activeModal()}
      <style jsx>
       {`
        .hpcontent {
            position: relative;
          }

        .hpcontent:hover .hptitle {
           border-left:6px solid #E34F35;
        }

        .hptitle {
          font-family:'Barrio', sans-serif;
          font-size: 24px;
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
