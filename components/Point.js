import Tappable from "react-tappable/lib/Tappable";

const Point = props => (
	<Tappable
		className={`pointzone ${props.stopped && "stopped"}`}
		onTap={props.clickfunction}
	>	
	<div className="pointwrap">
		<img src={`./static/imgs/hotspots/hotspot_${props.hpid}.png`} alt={props.title}/>
		<div className="Point">
			<h1>{props.title}</h1>
		</div>
	</div>

		<style jsx>{`
			.pointzone {
				position: relative;
			}

			.Point {
				width: 120px;
				height: 80px;
				background-color: #000;
				animation: clipping infinite 1.5s;
				transition: all ease-in 0.2s;
				transform: rotate(-30deg);
				margin-top:-30px;
			}

			img {
				position: absolute;
				top: 35px;
				left: -34px;
				z-index: 10;
			}

			.pointwrap:hover .Point {
				background-color: #fb0408;
				animation: none;
				clip-path: polygon(0 20%, 100% 0, 93% 93%, 6% 69%);
			}

			.pointwrap:hover img {
				transform: rotate(25deg);
			}

			@keyframes clipping {
				0% {
					clip-path: polygon(0 20%, 100% 0, 93% 93%, 6% 69%);
				}
				25 % {
					clip-path: polygon(0 20%, 100% 0, 100% 94%, 0 72%);
				}
				50% {
					clip-path: polygon(0 24%, 97% 6%, 100% 94%, 2% 67%);
				}
				75% {
					clip-path: polygon(5% 24%, 97% 6%, 94% 92%, 10% 72%);
				}
				100% {
					clip-path: polygon(0 20%, 100% 0, 93% 93%, 6% 69%);
				}
			}

			h1 {
				font-family: "Barrio", sans-serif;
				font-size: 16px;
				padding: 0;
				margin: 0;
				width: auto;
				
				position: absolute;
				top: 14px;
				left: 18px;
				transform: rotate(-10deg);
			}
		`}</style>
	</Tappable>
);

export default Point;
