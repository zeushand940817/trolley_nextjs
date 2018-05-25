import data_trolley from "../data/data_trolley.json";
import Figure from "./Figure.js";

class Gallery extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			images: [],
			curImage: 0,
			imagesTotal: 0
		};

		this.nextImage = this.nextImage.bind(this);
	}

	componentDidMount() {
		let images = data_trolley.filter(
			image => image["PALABRAS CLAVES"] === this.props.keyword
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
				this.state.images[key].ID.toUpperCase() +
				".jpg"
			);
		}
	}

	buildImageTitle(key) {
		if (this.state.images[key] !== undefined) {
			return this.state.images[key]["TITULO"];
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
		let next = 0;
		if (this.state.imagesTotal - 1 !== this.state.curImage) {
			next = this.state.curImage + 1;
		}
		this.setState({
			curImage: next
		});
	}

	prevImage() {
		let prev = this.state.imagesTotal - 1;
		if (this.state.imagesTotal !== this.state.curImage) {
			prev = this.state.curImage - 1;
		}
		this.setState({
			curImage: prev
		});
	}

	render() {
		return (
			<div>
				<div className="Gallery" onClick={this.nextImage}>
					{this.curImage()}
				</div>
				<style jsx>{`
					.Gallery {
						overflow: hidden;
						margin: 24px 0;
						padding: 6px;
						background-color: #f0f0f0;
						color: #333;
						box-shadow: 0 0 35px #333;
					}
				`}</style>
			</div>
		);
	}
}

export default Gallery;
