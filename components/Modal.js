
class Modal extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
			return (
				<div>
					<div className="modal animated fadeInUp">
						<div className="modalContent">
							{this.props.title}
							{this.props.close}
							{this.props.children}
						</div>
					</div>
					<style jsx>
					{`
						.modal {
							position:absolute;
							width:100%;
							height:100%;
							background-color:rgba(0,0,0,0.4);			
						}
						.modalContent {
							padding:16px;
							background-color:rgba(0,0,0,0.8);
							height:100%;
							width:100%;
						}
						`
					}
					</style>
				</div>
			);	
	}
}

export default Modal;