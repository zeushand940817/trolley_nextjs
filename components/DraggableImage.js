import Draggable from 'popmotion-draggable/lib/react';

class DraggableImage extends React.Component {
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
			<Draggable className="draggable" onDrag={this.onDrag}>
				<div className="imgDrag"/>
			</Draggable>
			<style jsx>{
				`
				.imgDrag {
					width:150px;
					height:100px;
					display:block;
  					user-drag: none;
  					background-size:contain;
  					background-repeat:no-repeat;
  					background-image:url(${ './static/collage/' + this.props.image})
				}
				`
			}</style>
			</div>
			)
	}	
}

export default DraggableImage