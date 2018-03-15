import DraggableImage from '../components/DraggableImage.js';

class Collage extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		console.log(this.props);
	}

	onDrag() {

	}

	render() {
		return(
			<div>
				<div className="collageContainer">
				{this.props.data.cortes.map((image, index) => (
					<DraggableImage key={index} image={image} />
					))}
				</div>
				<style jsx>{
					`
					.collageContainer {
						background-color:#f0f0f0;
					}
					`
				}</style>
			</div>
			)
	}	
}

export default Collage