import trackPage from "./trackPage";

class ModalVideo extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		trackPage(window.location.pathname, this.props.title);
	}

	render() {
		return (
			<div className="ModalWrapper">
				<div className="ModalVideo">
					{this.props.close}
					<div className="ModalVideoContent">
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
						.ModalWrapper {
							width: 100%;
							height: 100vh;
							background-color: #000;
							position: absolute;
							top: 0;
							left: 0;
							z-index: 20;
						}
						.ModalVideoContent {
							padding: 0;
							display: block;
							max-width: ${this.props.height}px;
							overflow: hidden;
							text-align: center;
							margin: 0 auto;
						}
						@media screen and (max-width: 720px) {
							.ModalVideoContent {
								margin-top: 60px;
							}
						}
					`}
				</style>
			</div>
		);
	}
}

export default ModalVideo;
