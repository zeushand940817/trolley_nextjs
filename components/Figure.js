// import React, { Component } from "react";
// import Image from "react-graceful-image";

const Figure = props => (
	<div className="figureWrapper">
		<figure>
			<img className="lazyImage" src={props.imageUrl} title={props.imageTitle} />
			<p className="imageTitle">{props.imageTitle}</p>
		</figure>
		
		<style jsx>
			{`
				.figureWrapper {
					height: 100%;
					display: flex;
					align-items: center;
				}

				figure {
					text-align: center;
					margin: auto;
					max-width: 100%;
					max-height: 100%;
				}
				.lazyImage {
					max-width: 100%;
					max-height: 70vh;
				}

				@media screen and (max-width: 768px) {
					.lazyImage {
						max-height: 50vh;
					}
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
