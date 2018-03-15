
import FontAwesomeIcon from '@fortawesome/react-fontawesome';	
import faPlay from '@fortawesome/fontawesome-free-solid/faPlay';
import faStop from '@fortawesome/fontawesome-free-solid/faStop';

class MarzipanoUI extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const checkIcon = () => {
			if(this.props.autorotate === true) {
				return (<FontAwesomeIcon icon={faStop} />)
			} else {
				return (<FontAwesomeIcon icon={faPlay} />)
			}
		}
		return(
			<div>
			<div className={this.props.autorotate === true ? 'button active' : 'button'} onClick={this.props.rotate}>
				{checkIcon()}
			</div>
			<style jsx>{
				`
				.button {
					position: absolute;
					bottom:0;
					left:10px;
					background-color:white;
					color:black;
					padding:6px;
					z-index:10;
					font-size:20px;
				}
				.button:hover {
					background-color:black;
					color:white;
				}
				`
			}</style>
			</div>
			)
	}
}

export default MarzipanoUI