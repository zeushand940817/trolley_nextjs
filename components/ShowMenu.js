import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTimes from "@fortawesome/fontawesome-free-solid/faTimes";
import faBars from "@fortawesome/fontawesome-free-solid/faBars";

class ShowMenu extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const checkIcon = () => {
			if (this.props.active === true) {
				return <FontAwesomeIcon icon={faTimes} />;
			} else {
				return <FontAwesomeIcon icon={faBars} />;
			}
		};
		return (
			<div>
				<div
					className={
						this.props.active === true
							? "button active noselect"
							: "button noselect"
					}
					onClick={this.props.onClick}
				>
					{checkIcon()}
				</div>
				<style jsx>{`
					.button {
						position: absolute;
						top: 6px;
						right: 6px;
						background-color: white;
						color: black;
						padding: 6px;
						z-index: 10;
						font-size: 24px;
					}
					.button:hover {
						background-color: black;
						color: white;
					}
				`}</style>
			</div>
		);
	}
}

export default ShowMenu;
