import Image from "react-graceful-image";

const Figure = props => (
	<div className="figureWrapper">
		<figure>
			<Image className="lazyImage" style={{maxWidth: "100%", maxHeight: "75vh"}} src={props.imageUrl} title={props.imageTitle} />
		</figure>
		
		<style jsx>
			{`
				.figureWrapper {
					height: 100%;
					width: 100%;
					display: flex;
					align-items: center;
					text-align: center;
				}

				figure {
					text-align: center;
					margin: 0 auto;
				}

				@media screen and (max-width: 768px) {
						
				}

				p {
					font-size: 18px;
					text-transform: capitalize;
					margin: 0;
					padding: 12px 0;
					font-family: "Special Elite", monospace;
				}
			`}
		</style>
	</div>
);

export default Figure;
