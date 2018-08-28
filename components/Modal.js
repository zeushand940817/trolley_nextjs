class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			specs: {
				width: "90%",
				height: "auto",
				overflowY: "scroll",
				overflowX: "hidden",
				transform: "rotate3d(0, 0, 1, 1deg)",
				position: "absolute"
			}
		};
	}

	componentDidMount() {
		this.modalDimensions();
	}

	modalDimensions() {
		if (this.props.type === "collage") {
			this.setState({
				specs: {
					width: "90%",
					height: "90%",
					overflowX: "hidden",
					overflowY: "hidden",
					transform: "none",
					position: "relative"
				}
			});
		}
	}

	render() {
		return (
			<div>
				<div className="modal">
					{this.props.close}
					<div className="modalContent">
						<h2>{this.props.title}</h2>
						{this.props.content}
					</div>
				</div>
				<style jsx>
					{`
						h2 {
							font-family: "Barrio", sans-serif;
							font-size: 32px;
							margin-top: 0;
						}
						.modal {
							position: ${this.state.specs.position};
							width: ${this.state.specs.width};
							max-height: 100%;
							top: 50px;
							right: 0;
							padding-left: 36px;
							overflow-y: ${this.state.specs.overflowY};
							overflow-x: ${this.state.specs.overflowX};
							transform: ${this.state.specs.transform};
							border-top: 4px solid white;
							margin: 0 auto;
						}
						.modalContent {
							padding: 12px 32px 64px;
							background-color: rgba(0, 0, 0, 0.8);
							height: ${this.state.specs.height};
						}
					`}
				</style>
			</div>
		);
	}
}

export default Modal;
