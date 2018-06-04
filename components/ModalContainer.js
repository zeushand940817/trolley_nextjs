class ModalContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.ModalContainerDimensions();
	}

	ModalContainerDimensions() {}

	render() {
		return (
			<div>
				<div className="ModalContainer">
					{this.props.close}
					<div className="ModalContainerContent">
						{this.props.children}
					</div>
				</div>
				<style jsx>
					{`
						h2 {
							font-family: "Barrio", sans-serif;
							font-size: 32px;
							margin-top: 0;
						}
						.ModalContainer {
							width: auto;
							max-width: 600px;
							max-height: 60%;
							top: 150px;
							right: 0;
							padding: 0;
							z-index: 2;
							transform: rotate3d(0, 0, 1, -3deg);
							margin: 24px auto;
						}
						.ModalContainerContent {
							padding: 0;
							background-color: transparent;
						}
						@media screen and (max-width: 720px) {
							.ModalContainer {
								max-width: 90%;
							}
						}
					`}
				</style>
			</div>
		);
	}
}

export default ModalContainer;
