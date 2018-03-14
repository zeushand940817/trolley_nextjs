
class Modal extends React.Component {
	constructor(props) {
		super(props);
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
							font-family:'Barrio', sans-serif;
          					font-size: 32px;
          					margin-top:0
						}
						.modal {
							position:absolute;
							width:60%;
							max-height:100%;
							top:50px;
							right:0;
							padding-left:36px;
							overflow-y: scroll;
							transform: rotate3d(0, 0, 1, 3deg);
							border-top:4px solid white;			
						}
						.modalContent {
							padding:12px 32px 16px;
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