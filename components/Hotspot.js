import data from '../data/dummy.json';

class Hotspot extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    //Create hotspot function
  }

  componentWillUnmount() {}

  render() {
    return(
      <div className="mz-hotspot">
          {this.props.title}         
      </div>  
    )
  }
}

export default Hotspot
