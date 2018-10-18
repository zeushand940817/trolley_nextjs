import data_trolley from "../data/data_trolley_dspace.json";
import config from "../config.js";
import Figure from "./Figure.js";
import ImageData from "./ImageData.js";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faChevronRight from "@fortawesome/fontawesome-free-solid/faChevronRight";
import faChevronLeft from "@fortawesome/fontawesome-free-solid/faChevronLeft";
import faFolderOpen from "@fortawesome/fontawesome-free-solid/faFolderOpen";
import faFolder from "@fortawesome/fontawesome-free-solid/faFolder";

class Gallery extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			images: [],
			curImage: 0,
			imagesTotal: 0,
			imageData: null,
			isFlipped: "normal"
		};

		this.nextImage = this.nextImage.bind(this);
		this.prevImage = this.prevImage.bind(this);
		this.flipImage = this.flipImage.bind(this);
		this.unFlipImage = this.unFlipImage.bind(this);
	}

	parseDspaceKeywords(keywords) {
		let arrKeywords = keywords.split(config.dspaceKeywordSeparator);
		return arrKeywords;
	}

	isKeywordIn(keywords, keyword, imgid) {
		let kw = this.parseDspaceKeywords(keywords);
		let imgexists = imgid.indexOf("F");
		if (kw.indexOf(keyword) !== -1 && imgexists !== -1) {
			return true;
		} else {
			return false;
		}
	}

	componentDidMount() {
		let images = data_trolley.filter(image =>
			this.isKeywordIn(
				image["dc.subject.other"],
				this.props.keyword,
				image["dc.identifier.other"]
			)
		);
		this.setState({
			images: images,
			imagesTotal: images.length
		});
	}

	urlExists(url) {
		var http = new XMLHttpRequest();
		http.open("HEAD", url, false);
		http.send();
		return http.status !== 404;
	}

	buildImageUrl(key) {
		if (this.state.images[key] !== undefined) {
			return (
				"./static/material/" +
				this.state.images[key]["dc.identifier.other"].toUpperCase() +
				".jpg"
			);
		}
	}

	buildImageTitle(key) {
		if (this.state.images[key] !== undefined) {
			return this.state.images[key]["dc.title"];
		}
	}

	curImage() {
		if (this.state.images.length > 0) {
			return (
				<Figure
					key={this.state.curImage}
					imageUrl={this.buildImageUrl(this.state.curImage)}
					imageTitle={this.buildImageTitle(this.state.curImage)}
				/>
			);
		}
	}

	curData() {
		if (this.state.images.length > 0) {
			let imageData = this.state.images[this.state.curImage];

			return (
				<ImageData data={imageData} />
			);
		}
	}

	nextImage() {
		let next = this.state.curImage;

		if (this.state.imagesTotal - 1 !== this.state.curImage) {
			next = this.state.curImage + 1;
		}
		this.setState({
			curImage: next
		});
	}

	prevImage() {
		let prev = this.state.curImage > 0 ? this.state.imagesTotal - 1 : 0;
		if (this.state.imagesTotal !== this.state.curImage) {
			prev = this.state.curImage === 0 ? 0 : this.state.curImage - 1;
		}
		this.setState({
			curImage: prev
		});
	}

	flipImage() {
		this.setState({
			isFlipped: "is-flipped"
		});
	}

	unFlipImage() {
		this.setState({
			isFlipped: "normal"
		});
	}

	render() {
		return (
			<div>
				<div className={`Gallery ${this.state.isFlipped}`}>
					<div className={`gallery-wrapper ${this.state.isFlipped}`}>
						<div className="gallery-side gallery-front">
							{this.curImage()}
							<span className="flipper moreInfo" onClick={this.flipImage}>
								<FontAwesomeIcon icon={faFolderOpen} />
							</span>
						</div>
						<div className="gallery-side gallery-back">
							{this.curData()}
							<span
								className="flipper lessInfo"
								onClick={this.unFlipImage}
							>
								<FontAwesomeIcon icon={faFolder} />
							</span>
						</div>
					</div>
					<span className="GalleryNavPrev" onClick={this.prevImage}>
						<FontAwesomeIcon icon={faChevronLeft} />
					</span>
					<span className="GalleryNavNext" onClick={this.nextImage}>
						<FontAwesomeIcon icon={faChevronRight} />
					</span>
					<span className="counter">
						#{this.state.curImage + 1} / {this.state.imagesTotal}
					</span>
				</div>
				<style jsx>{`
					.Gallery {
						margin: 48px 0 0 0;
						padding: 6px;
						height: 600px;
						perspective: 1200px;
					}

					@media screen and (max-width: 768px) {
						.Gallery {
							height: 490px;
						}
					}

					.gallery-wrapper {
						width: 100%;
						height: 100%;
						position: relative;
						transition: transform 1s;
						transform-style: preserve-3d;
						background-color: #fff8eb;
						color: #333;
						box-shadow: 0 0 35px #333;
					}

					.flipper {
						position: absolute;
						bottom: 6px;
						right: 6px;
						color: #e34f35;
						font-size: 24px;
						cursor: pointer;
					}

					.flipper:hover {
						color: #333;
					}

					.gallery-side {
						position: absolute;
						height: 100%;
						width: 100%;
						backface-visibility: hidden;
						top: 0;
						left: 0;
					}

					.gallery-back {
						transform: rotateY(180deg);
						background-color: #555;
					}

					.gallery-wrapper.is-flipped {
						transform: rotateY(180deg);
					}

					.GalleryNavPrev,
					.GalleryNavNext {
						position: absolute;
						top: 40%;
						display: block;
						background-color: #333;
						color: white;
						font-size: 24px;
						padding: 12px 24px;
						opacity: 0.4;
						transition: opacity 0.5s;
						cursor: pointer;
						-webkit-touch-callout: none; /* iOS Safari */
						-webkit-user-select: none; /* Safari */
						-khtml-user-select: none; /* Konqueror HTML */
						-moz-user-select: none; /* Firefox */
						-ms-user-select: none; /* Internet Explorer/Edge */
						user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
					}

					.is-flipped .GalleryNavPrev, .is-flipped .GalleryNavNext {
						opacity: 0;
					}

					.counter {
						background-color: #e34f35;
						color: white;
						display: block;
						padding: 6px;
						width: 80px;
						position: absolute;
						top: -12px;
						left: -12px;
						transform: rotate3d(0, 0, 1, 4deg);
						font-family: "Barrio", sans-serif;
						text-align: center;
					}

					.GalleryNavPrev:hover,
					.GalleryNavNext:hover {
						background-color: #e34f35;
						opacity: 0.8;
					}

					.GalleryNavPrev {
						left: -12px;
					}

					.GalleryNavNext {
						right: -12px;
					}

					.imageData {
						padding: 24px;
						color: white;
					}
				`}</style>
			</div>
		);
	}
}

export default Gallery;
