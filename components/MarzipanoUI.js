import FontAwesomeIcon from "@fortawesome/react-fontawesome";

import faPlay from "@fortawesome/fontawesome-free-solid/faPlay";
import faStop from "@fortawesome/fontawesome-free-solid/faStop";
import faCompass from "@fortawesome/fontawesome-free-solid/faCompass";
import faArrowsAlt from "@fortawesome/fontawesome-free-solid/faArrowsAlt";

import ReactTooltip from "react-tooltip";

class MarzipanoUI extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const checkIcon = () => {
			if (this.props.autorotate === true) {
				return <FontAwesomeIcon icon={faStop} />;
			} else {
				return <FontAwesomeIcon icon={faPlay} />;
			}
		};
		const showGyro = () => {
			if (this.props.isMobile === true) {
				return "visible inline";
			} else {
				return "hidden";
			}
		};
		return (
			<div>
				<div className="buttons noselect">
					<div
						data-tip="Activar rotación automática"
						className={
							this.props.autorotate === true
								? "button active"
								: "button"
						}
						onClick={this.props.rotate}
					>
						{checkIcon()}
					</div>

					<div className={showGyro()}>
						<div
							data-tip="Activar sensor de movimiento"
							className={
								this.props.isGyroOn === true
									? "button button-gyro active"
									: "button button-gyro"
							}
							onClick={this.props.gyro}
						>
							<FontAwesomeIcon icon={faCompass} />
						</div>
					</div>
					<div
						data-tip="Pantalla completa"
						className="button fullScreen"
						onClick={this.props.goFull}
					>
						<FontAwesomeIcon icon={faArrowsAlt} />
					</div>
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
								{scene.id}
							</div>
						))}
					</div>
					<ReactTooltip place="top" effect="solid" />
					<ReactTooltip
						place="top"
						effect="solid"
						getContent={dataTip => `${dataTip}`}
					/>
				</div>
				<style jsx>{`
					.buttons {
						position: absolute;
						bottom: 0;
						left: 30px;
					}
					.button {
						background-color: white;
						color: black;
						padding: 6px;
						z-index: 10;
						font-size: 20px;
						cursor: pointer;
						margin-right: 10px;
						display: inline-block;
						margin-right: 6px;
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

					.button:hover,
					button-gyro:hover,
					.button.active,
					.button-gyro.active {
						background-color: black;
						color: white;
					}
					.sceneSwitcher {
						display: inline-block;
					}
					.sceneButton {
						padding: 6px 12px;
						font-family: "Barrio", sans-serif;
						font-size: 32px;
						display: inline-block;
						background-color: white;
						text-align: center;
						color: black;
						margin-right: 6px;
						cursor: pointer;
					}
					.sceneButton.active {
						background-color: #e34f35;
						color: white;
					}
				`}</style>
			</div>
		);
	}
}

export default MarzipanoUI;
