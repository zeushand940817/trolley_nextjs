import ShowMenu from "../components/ShowMenu.js";

class PointsList extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	componentDidUpdate(prevProps, prevState) {}

	render() {
		const isActiveNavi = () => {
			if (this.props.activeMenu === true) {
				return (
					<div>
						<div className="navi active">
							<ul>
								{this.props.hotspots.map(hotspot => (
									<li
										className={
											this.props.activeKey === hotspot.id
												? "active"
												: ""
										}
										onClick={() =>
											this.props.setPos(
												hotspot.position,
												hotspot.id,
												hotspot.type
											)
										}
										position={hotspot.position}
										key={hotspot.id}
									>
										{hotspot.title}
									</li>
								))}
							</ul>
						</div>
						<style jsx>
							{`
								.navi {
									position: absolute;
									bottom: 100px;
									right: -24px;
									width: 300px;
									z-index: 2;
									display: block;
									width: 100%;
									max-width: 700px;
								}

								ul {
									margin: 0;
									padding: 0;
								}

								li {
									list-style: none;
									cursor: pointer;
									font-family: "Barrio", sans-serif;
									font-size: 24px;
									color: white;
									background-color: #000;
									margin: 10px 0;
									padding: 12px 6px 6px 12px;
									transform: rotate3d(0, 0, 1, -15deg);
									display: block;
									border-left: 5px solid white;
								}
								li.active,
								li:hover {
									color: white;
									background-color: #e34f35;
								}
							`}
						</style>
					</div>
				);
			}
		};
		if (this.props.hotspots !== undefined) {
			return (
				<div>
					<ShowMenu
						onClick={this.props.showMenu}
						active={this.props.activeMenu}
					/>
					{isActiveNavi()}
				</div>
			);
		} else {
			return null;
		}
	}
}

export default PointsList;
