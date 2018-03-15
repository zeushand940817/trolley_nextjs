import {Stage, Layer, Rect, Image} from 'react-konva';
import DraggableImage from '../components/DraggableImage.js';

class Collage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			image: null
		}
	}

	componentDidMount() {
		console.log(this.refs.collage.getStage());
	}

	onDrag() {

	}

	render() {
		return(
			<div>
			<div className="stageContainer">
			<Stage ref="collage" height="500" width="900">
			<Layer>
			{this.props.data.cortes.map((corte, id) => (
				<DraggableImage key={id} image={corte}/>
				))		
			}
			</Layer>
			</Stage>
			
			</div>
			<style jsx>{`
				.stageContainer {
					width:100%;
					height:100%;
					background-color:#f0f0f0;
				}
				`}</style>
				</div>
				)
	}	
}

export default Collage