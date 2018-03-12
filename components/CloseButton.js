
class CloseButton extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return(
		<div>
			<button onClick={this.props.onClick} className="CloseButton">Cerrar</button>
		</div>
		)
	}
}

export default CloseButton