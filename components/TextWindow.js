import ModalContainer from "../components/ModalContainer";
import CloseButton from "../components/CloseButton.js";

import ReactMarkDown from "react-markdown";

//Recibe un prop de un archivo markdown que se usa para generar texto
class TextWindow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			markdown: null
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

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.content !== this.props.content) {
			this.fetchText(this.props.content);
		}
	}

	render() {
		return (
			<ModalContainer
				className="TextWindow"
				close={<CloseButton onClick={this.props.close} />}
				title={this.props.title}
			>
				<ReactMarkDown source={this.state.markdown} />
			</ModalContainer>
		);
	}
}

export default TextWindow;
