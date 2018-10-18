const Point = props => (
	<div className={props.stopped && 'stopped'}>
		<svg className="Point" height="100px" width="100px">
			
			<path
				className="PathText"
				id={props.id}
				d="M 32,0 A 32,32 0 0 1 -32,0 A 32,32 0 0 1 32,0"
				transform="translate(50,50)"
				stroke="black"
				strokeWidth="25"
			/>



			<text className="PointText" fill="#fff" strokeWidth="0">
				<textPath xlinkHref={`#${props.id}`} startOffset="0">
					<tspan dy="6">{props.title}</tspan>
				</textPath>
			</text>

			<image x={26} y={26} xlinkHref={`./static/imgs/hotspots/hotspot_${props.hpid}.png`}
			alt=""
			className="hpIcon"
			width="40"
			height="40"
			/>
			
		</svg>
		<style jsx>{`
			image.hpIcon {
				position: absolute;
				max-width: 40px;
				height: auto;
				top: 28px;
				left: 28px;
				z-index: 10;
			}
			.Point {
				cursor: pointer;
				fill: cursor: pointer;
				fill: white;
			}

			.Point:hover .PathText {
				stroke: #e25138;
			}

			.PointText {
				animation: rotating 30s linear infinite;
				transform-origin: 50% 50%;
				fill: white;
				transition: fill ease-in 0.4s;		
			}

			.Point:hover {
				//animation: rotating 6s linear infinite;
				fill: black;
			}

			.PointText {
				stroke: #000;
				text-transform: uppercase;
				font-family: "Barrio", sans-serif;
				font-size: 18px;
			}

			.stopped .PointText {
				transition: none !important;
				animation: none !important;
			}

			@keyframes rotating {
				100% {
					transform: rotate(360deg);
				}
			}
		`}</style>
	</div>
);

export default Point;
