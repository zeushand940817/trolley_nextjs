import ModalContainer from "../components/ModalContainer";
import CloseButton from "../components/CloseButton.js";
import scrollParagraph from "../components/scrollParagraph.js";
import ReactMarkDown from "react-markdown";

//Recibe un prop de un archivo markdown que se usa para generar texto
class TextWindow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			markdown: null,
			activeParagraph: 1
		};
	}

	fetchText(texturl) {
		fetch(texturl)
			.then(response => {
				return response.text();
			})
			.then(text => {
				this.setState({
					markdown: text
				});
			});
	}

	componentDidMount() {
		this.fetchText(this.props.content);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.content !== this.props.content) {
			this.fetchText(this.props.content);
		}
	}

	render() {
		return (
			<div>
				<ModalContainer
					top={50}
					className="TextWindow"
					close={<CloseButton onClick={this.props.close} />}
					title={this.props.title}
				>
					<div className="textContent">
						<ReactMarkDown
							renderers={{ root: scrollParagraph }}
							sourcePos={true}
							source={this.state.markdown}
						/>
					</div>
				</ModalContainer>
				<style jsx>
					{`
						.textContent {
							background-color: #000;
							padding: 36px;
							font-family: "Special Elite", monospace;
							line-height: 1.4em;
							font-size: 18px;
							box-shadow: 0 0 22px #333;
							max-height: ${(this.props.height / 100) * 70}px;
							overflow-y: auto;
						}

						@media screen and (max-width: 720px) {
							.textContent {
								background-color: rgba(0, 0, 0, 0.8);
								font-size: 16px;
								max-height: ;
								padding: 12px;
							}
						}
					`}
				</style>
			</div>
		);
	}
}

export default TextWindow;
