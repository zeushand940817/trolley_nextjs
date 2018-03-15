import {Image, Rect } from 'react-konva';

class DraggableImage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: false,
			image: null
		}
	}

	componentDidMount() {
		console.log(this.props.image);
		const image = new window.Image();
		image.src = './static/collage/' + this.props.image;
		image.onload = () => {
			this.setState({
				image: image
			})
		}
	}
	
	onClick() {
		console.log('click draggable');
		this.setState = {
			selected: true
		}
	}

	render() {
		return(
			<Image image={this.state.image} scale={{x:0.4, y:0.4}} draggable={true}/>
			)
	}	
}

export default DraggableImage