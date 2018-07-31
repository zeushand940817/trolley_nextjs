import data_trolley from "../data/data_trolley_dspace.json";
import config from "../config.js";
import Figure from "./Figure.js";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faChevronRight from "@fortawesome/fontawesome-free-solid/faChevronRight";
import faChevronLeft from "@fortawesome/fontawesome-free-solid/faChevronLeft";

class Gallery extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			images: [],
			curImage: 0,
			imagesTotal: 0
		};

		this.nextImage = this.nextImage.bind(this);
		this.prevImage = this.prevImage.bind(this);
	}

	parseDspaceKeywords(keywords) {
		let arrKeywords = keywords.split(config.dspaceKeywordSeparator);
		console.log(arrKeywords);
		return arrKeywords;
	}

	isKeywordIn(keywords, keyword) {
		let kw = this.parseDspaceKeywords(keywords);
		if (kw.indexOf(keyword) !== -1) {
			return true;
		} else {
			return false;
		}
	}

	componentDidMount() {
		let images = data_trolley.filter(
			image => this.isKeywordIn(image["dc.subject.other"], this.props.keyword)
		);
		this.setState({
			images: images,
			imagesTotal: images.length
		});
	}

	buildImageUrl(key) {
		if (this.state.images[key] !== undefined) {
			return (
				"./static/material/" +
				this.state.images[key]['dc.identifier.other'].toUpperCase() +
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

	nextImage() {
		console.log("next");
		let next = 0;
		if (this.state.imagesTotal - 1 !== this.state.curImage) {
			next = this.state.curImage + 1;
		}
		this.setState({
			curImage: next
		});
	}

	prevImage() {
		console.log("prev");
		let prev = this.state.curImage > 0 ? this.state.imagesTotal - 1 : 0;
		if (this.state.imagesTotal !== this.state.curImage) {
			prev = this.state.curImage === 0 ? 0 : this.state.curImage - 1;
		}
		this.setState({
			curImage: prev
		});
	}

	render() {
		return (
			<div>
				<div className="Gallery">
					<span className="counter">
						#{this.state.curImage + 1} / {this.state.imagesTotal}
					</span>
					{this.curImage()}
					<span className="GalleryNavPrev" onClick={this.prevImage}>
						<FontAwesomeIcon icon={faChevronLeft} />
					</span>
					<span className="GalleryNavNext" onClick={this.nextImage}>
						<FontAwesomeIcon icon={faChevronRight} />
					</span>
				</div>
				<style jsx>{`
					.Gallery {
						overflow: hidden;
						margin: 48px 0 0 0;
						padding: 6px;
						background-color: #fff8eb;
						color: #333;
						box-shadow: 0 0 35px #333;
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
						-webkit-touch-callout: none; /* iOS Safari */
						-webkit-user-select: none; /* Safari */
						-khtml-user-select: none; /* Konqueror HTML */
						-moz-user-select: none; /* Firefox */
						-ms-user-select: none; /* Internet Explorer/Edge */
						user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
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
				`}</style>
			</div>
		);
	}
}

export default Gallery;
