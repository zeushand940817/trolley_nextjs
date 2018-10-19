const Figure = props => (
	<div className="figureWrapper">
		<figure>
			<img src={props.imageUrl} title={props.imageTitle} />
			<p className="imageTitle">{props.imageTitle}</p>
		</figure>
		<style jsx>
			{`
				.figureWrapper {
					display: flex;
					height: 100%;
					align-content: center;
				}

				figure {
					text-align: center;
					margin: auto;
					align-self: center;
				}
				img {
					max-width: 100%;
					max-height: 560px;
					margin: 0 auto;
				}

				@media screen and (max-width: 768px) {
					img {
						max-height: 50vh;
					}
				}

				p {
					font-size: 18px;
					text-transform: capitalize;
					margin: 0;
					font-family: "Special Elite", monospace;
				}
			`}
		</style>
	</div>
);

export default Figure;
