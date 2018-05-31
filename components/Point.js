const Point = props => (
	<div>
		<svg className="Point" height="100px" width="100px">
			<path
				id={props.id}
				d="M 32,0 A 32,32 0 0 1 -32,0 A 32,32 0 0 1 32,0"
				transform="translate(50,50)"
				stroke="black"
				stroke-width="25"
			/>

			<text className="PointText" fill="#fff" stroke-width="0">
				<textPath href={`#${props.id}`} startOffset="0">
					<tspan dy="6">{props.title}</tspan>
				</textPath>
			</text>
		</svg>
		<style jsx>{`
			.Point {
				animation: rotating 10s linear infinite;
				transform-origin: 50% 50%;
				fill: #e34f35;
				transition: fill ease-in 0.4s;
			}

			.Point:hover {
				//animation: rotating 6s linear infinite;
				fill: white;
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
