
class Modal extends React.Component {
	constructor(props) {
		super(props);
	}

	handleClose() {
		this.setState({isActive: false});
	}

	componentDidMount() {
	}

	render() {
			return (
				<div>
					<div className="modal">
						{this.props.title}
					</div>
					<style jsx>
					{`
						.modal {
							position:absolute;
							width:100%;
							height:100%;
							background-color:rgba(0,0,0,0.4);			
						}`
					}
					</style>
				</div>
			);	
	}
}

export default Modal;