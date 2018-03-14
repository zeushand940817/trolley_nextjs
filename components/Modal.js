
class Modal extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
			return (
				<div>
					<div className="modal animated fadeInUp">
						<div className="modalContent">
							<h2>{this.props.title}</h2>
							{this.props.children}
							{this.props.close}
						</div>
					</div>
					<style jsx>
					{`
						h2 {
							font-family:'Barrio', sans-serif;
          					font-size: 32px;
						}
						.modal {
							position:absolute;
							width:100%;
							height:100%;
							background-color:rgba(0,0,0,0.4);
							overflow: scroll;			
						}
						.introModal {
							margin-bottom:24px;
						}
						.modalContent {
							padding:32px 16px;
							background-color:rgba(0,0,0,0.8);
						}
						`
					}
					</style>
				</div>
			);	
	}
}

export default Modal;