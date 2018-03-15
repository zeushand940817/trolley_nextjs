import FontAwesomeIcon from '@fortawesome/react-fontawesome'	
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

class CloseButton extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return(
		<div>
			<a onClick={this.props.onClick} className="CloseButton"><FontAwesomeIcon icon={faTimes}/></a>
			<style jsx>{`
				.CloseButton {
					clear:both;
					overflow:hidden;
					padding:6px;
					font-size:32px;
					color: white;
					position:absolute;
					top:0;
					background-color:#E34F35;
					left:0;
					z-index:10;
				}
			
			`}</style>
		</div>
		)
	}
}

export default CloseButton