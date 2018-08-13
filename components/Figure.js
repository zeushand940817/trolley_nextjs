const Figure = props => (
	<div>
		<figure>
			<img src={props.imageUrl} title={props.imageTitle} />
			<p className="imageTitle">{props.imageTitle}</p>
		</figure>
		<style jsx>
			{`
				figure {
					text-align: center;
					margin: 0;
					padding: 0;
				}
				img {
					max-width: 100%;
					max-height: 70vh;
				}
				p {
					font-size: 24px;
					text-transform: capitalize;
					margin: 0;
					font-family: "Special Elite", monospace;
				}
			`}
		</style>
	</div>
);

export default Figure;
