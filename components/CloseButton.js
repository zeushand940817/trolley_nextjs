
class CloseButton extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return(
		<div>
			<button onClick={this.props.onClick} className="CloseButton">Cerrar</button>
			<style jsx>{`
				button {
					clear:both;
					overflow:hidden;
					margin:24px 0;
					color: #333;
				}
			
			`}</style>
		</div>
		)
	}
}

export default CloseButton