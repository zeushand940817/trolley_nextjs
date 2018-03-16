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
		console.log(this.props.position);
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
			<Image x={this.props.position.x} y={this.props.position.y} image={this.state.image} scale={{x:1, y:1}} draggable={true}/>
			)
	}	
}

export default DraggableImage