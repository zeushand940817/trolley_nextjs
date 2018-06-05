class scrollParagraph extends React.Component {
	constructor(props) {
		super(props);
		this.setRef = this.setRef.bind(this);
		this.state = {
			activeParagraph: 0
		};
	}

	setRef(el) {
		this.textContent = el;
	}

	toggle() {
		console.log(this.textContent);
	}

	componentDidMount() {
		this.toggle();
	}

	render() {
		return (
			<div ref={this.setRef} className="modalParagraph">
				{this.props.children}
			</div>
		);
	}
}

export default scrollParagraph;
