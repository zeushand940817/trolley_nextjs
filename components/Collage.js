import {Stage, Layer, Rect, Image} from 'react-konva';
import DraggableImage from '../components/DraggableImage.js';

class Collage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			image: null,
			stageHeight: 500,
			stageWidth: 0
		}
	}

	componentDidMount() {
		const testFolder = './static/collage/';
		this.setState({
			stageWidth: window.innerWidth - 200,
			stageHeight: window.innerHeight - 300
		})

	}

	randomNum(max) {
		return (Math.floor(Math.random() * Math.floor(max)));
	}

	randomPos() {
		return {x: this.randomNum(this.state.stageWidth), y: this.randomNum(this.state.stageHeight)}
	}


	onDrag() {

	}

	genImage() {
		let stage = this.refs.collage.getStage();
		let image = stage.toDataURL();
		window.open(image, '_blank');
	}

	render() {
		return(
			<div>
			<div className="stageContainer">
			<Stage ref="collage" height={this.state.stageHeight} width={this.state.stageWidth}>
			<Layer>
			{this.props.data.cortes.map((corte, id) => (
				<DraggableImage position={this.randomPos()} key={id} image={corte}/>
				))		
			}
			</Layer>
			</Stage>
			<div className="genImage" onClick={this.genImage.bind(this)}>Generar imagen</div>
			</div>
			<style jsx>{`
				.stageContainer {
					width:100%;
					height:100%;
					background-color:#f0f0f0;
				}
				.genImage {
					background-color: #E34F35;
					padding:6px;
					color:white;
					font-family:'Barrio', sans-serif;
					font-size:24px;
					transform:rotate3d(0, 0, 1, 3deg);
					width:300px;
					cursor:pointer;
					text-align:center;
					position:absolute;
					top:20px;
					right:20px;
				}
				`}</style>
				</div>
				)
	}	
}

export default Collage