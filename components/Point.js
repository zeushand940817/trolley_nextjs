const Point = props => (
	<div>
		<img
			src={`./static/imgs/hotspots/hotspot_${props.hpid}.png`}
			alt=""
			className="hpIcon"
		/>
		<svg className="Point" height="100px" width="100px">
			<path
				id={props.id}
				d="M 32,0 A 32,32 0 0 1 -32,0 A 32,32 0 0 1 32,0"
				transform="translate(50,50)"
				stroke="black"
				strokeWidth="25"
			/>

			<text className="PointText" fill="#fff" strokeWidth="0">
				<textPath href={`#${props.id}`} startOffset="0">
					<tspan dy="6">{props.title}</tspan>
				</textPath>
			</text>
		</svg>
		<style jsx>{`
			img.hpIcon {
				position: absolute;
				max-width: 40px;
				height: auto;
				top: 28px;
				left: 28px;
				z-index: 10;
			}
			.Point {
				animation: rotating 30s linear infinite;
				transform-origin: 50% 50%;
				fill: #e34f35;
				transition: fill ease-in 0.4s;
			}

			.Point:hover {
				//animation: rotating 6s linear infinite;
				fill: #e34f35;
			}

			.PointText {
				stroke: #000;
				text-transform: uppercase;
				font-family: "Barrio", sans-serif;
				font-size: 20px;
			}

			@keyframes rotating {
				100% {
					transform: rotate(360deg);
				}
			}
			.hotspotCircle {
				position: absolute;
				top: 0;
				left: 0;
				display: block;
				background-color: transparent;
				border: 2px dashed #ff8c00;
				width: 20px;
				height: 20px;
				border-radius: 50%;
				transition: all ease-in 0.2s;
			}

			.hotspotCircle:hover {
				width: 40px;
				height: 40px;
				top: -10px;
				left: -10px;
			}
		`}</style>
	</div>
);

export default Point;
