class CloseButton extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<a onClick={this.props.onClick} className="CloseButton">
					X
				</a>
				<style jsx>{`
					.CloseButton {
						clear: both;
						overflow: hidden;
						padding: 6px;
						font-size: 24px;
						color: white;
						position: absolute;
						top: -12px;
						background-color: #e34f35;
						right: -12px;
						z-index: 10;
						font-family: 'Special Elite', monospace;
						cursor: pointer;
					}
				`}</style>
			</div>
		);
	}
}

export default CloseButton;
