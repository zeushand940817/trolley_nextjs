import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTimes from "@fortawesome/fontawesome-free-solid/faTimes";
import faDotCircle from "@fortawesome/fontawesome-free-solid/faDotCircle";

class ShowMenu extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const checkIcon = () => {
			if (this.props.active === true) {
				return <FontAwesomeIcon icon={faTimes} fixedWidth />;
			} else {
				return <FontAwesomeIcon icon={faDotCircle} fixedWidth />;
			}
		};
		return (
			<div>
				<div
					className={
						this.props.active === true
							? "button-show active noselect"
							: "button-show noselect"
					}
					onClick={this.props.onClick}
				>
					{checkIcon()}
				</div>
				<style jsx>{`
					.button-show {
						position: absolute;
						bottom: 0;
						right: 6px;
						background-color: white;
						color: black;
						padding: 6px;
						z-index: 100;
						font-size: 24px;
					}

					@media screen and (max-width: 768px) {
						.button-show {
							right: 0;
							bottom: 0;
						}
					}

					.button-show:hover {
						background-color: black;
						color: white;
					}
				`}</style>
			</div>
		);
	}
}

export default ShowMenu;
