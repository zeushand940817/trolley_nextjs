import Tappable from "react-tappable/lib/Tappable";

class CloseButton extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Tappable onTap={this.props.onClick}>
				<a className={`${this.props.type} CloseButton`}>
					X
				</a>
				</Tappable>
				<style jsx>{`
					.CloseButton {
						clear: both;
						overflow: hidden;
						padding: 6px;
						font-size: 24px;
						color: white;
						position: absolute;
						top: -12px;
						background-color:  #ff0307;
						right: -12px;
						z-index: 10;
						font-family: 'Special Elite', monospace;
						cursor: pointer;
					}
					.CloseButton.video {
						top:0;
						right:0;
					}
				`}</style>
			</div>
		);
	}
}

export default CloseButton;
