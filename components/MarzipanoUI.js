import PointsList from "../components/PointsList.js";
import ShowMenu from "../components/ShowMenu.js";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";

import faPlay from "@fortawesome/fontawesome-free-solid/faPlay";
import faStop from "@fortawesome/fontawesome-free-solid/faStop";
import faCompass from "@fortawesome/fontawesome-free-solid/faCompass";
import faArrowsAlt from "@fortawesome/fontawesome-free-solid/faArrowsAlt";
import faQuestion from "@fortawesome/fontawesome-free-solid/faQuestion";

class MarzipanoUI extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const checkIcon = () => {
			if (this.props.autorotate === true) {
				return <FontAwesomeIcon className="fa-fw" icon={faStop} />;
			} else {
				return <FontAwesomeIcon className="fa-fw" icon={faPlay} />;
			}
		};
		const showGyro = () => {
			if (this.props.hasGyro === true) {
				return "visible inline";
			} else {
				return "hidden";
			}
		};
		return (
			<div>
				<ShowMenu
					onClick={this.props.showMenu}
					active={this.props.activeMenu}
				/>
				<div className="sceneSwitcher">
					{this.props.scenes.map(scene => (
						<div
							data-for="Escena"
							data-tip={`${scene.title}`}
							key={scene.id}
							className={
								this.props.activeScene === scene.id
									? "sceneButton active"
									: "sceneButton"
							}
							onClick={() =>
								this.props.switcher(scene.scene, scene.id)
							}
						>
							{scene.title}
						</div>
					))}
				</div>
				<div className="buttons noselect">
					<div className={showGyro()}>
						<div
							data-tip="Activar sensor de movimiento"
							className={
								this.props.isGyroOn
									? "button button-gyro active"
									: "button button-gyro"
							}
							onClick={this.props.gyro}
						>
							<FontAwesomeIcon
								className="fa-fw"
								icon={faCompass}
							/>
						</div>
					</div>
					<div
						data-tip="Pantalla completa"
						className="button fullScreen"
						onClick={this.props.goFull}
					>
						<FontAwesomeIcon className="fa-fw" icon={faArrowsAlt} />
					</div>
					<div
						className="info button"
						data-tip="Ayuda de uso"
						onClick={() => this.props.toggleHelp()}
					>
						<FontAwesomeIcon className="fa-fw" icon={faQuestion} />
					</div>

					<PointsList
						activeKey={this.props.activeKey}
						hotspots={this.props.curHotspots}
						setPos={this.props.setPos}
						hotspotType={this.props.hotspotType}
						showMenu={this.props.showMenu}
						activeMenu={this.props.activeMenu}
						scene={this.props.scenes[this.props.activeScene]}
					/>
				</div>
				<style jsx>{`
					.buttons {
						position: fixed;
						bottom: 0;
						left: 12px;
						width: 90%;
						z-index: 100;
						height: 35px;
					}
					@media screen and (max-width: 768px) {
						.buttons {
							bottom: auto;
							top: 0;
							left: auto;
							right: 6px;
							width: 180px;
						}
					}

					.sceneSwitcher {
						position: fixed;
						bottom: 0;
						left: 0;
					}

					@media screen and (min-width: 769px) {
						.sceneSwitcher {
							left: 200px;
						}

						.button:hover,
						.button-gyro:hover {
							background-color: black;
							color: white;
						}
					}

					.button {
						background-color: white;
						color: black;
						padding: 6px;
						font-size: 20px;
						cursor: pointer;
						margin-right: 10px;
						display: inline-block;
						margin-right: 6px;
						box-shadow: 0 0 6px #555;
					}

					.button-gyro {
						background-color: white;
						color: black;
						padding: 6px;
						z-index: 10;
						font-size: 20px;
						cursor: pointer;
						display: inline-block;
						margin-right: 6px;
					}

					.button.active,
					.button-gyro.active {
						background-color: #e04f36;
						color: white;
					}

					.sceneSwitcher {
						display: inline-block;
					}
					.sceneButton {
						padding: 6px 12px 6px 48px;
						font-family: "Barrio", sans-serif;
						font-size: 32px;
						display: inline-block;
						background-color: white;
						text-align: center;
						color: black;
						margin-right: -66px;
						margin-bottom: 12px;
						cursor: pointer;
						box-shadow: 0 0 6px #555;
						transform: rotate(-45deg);
					}

					@media screen and (max-width: 768px) {
						.sceneButton {
							font-size: 16px;
							margin-right: -33px;
						}
					}

					.sceneButton.active {
						background-color: #e34f35;
						color: white;
					}

					.sceneButton:hover {
						background-color: #333;
						color: white;
					}
				`}</style>
			</div>
		);
	}
}

export default MarzipanoUI;
