import data_trolley from '../data/data_trolley.json'; 

class Gallery extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			images: [],
			curImage: 0,
			imagesTotal: 0
		}

		this.nextImage = this.nextImage.bind(this);
	}

	componentDidMount() {
		let images =  data_trolley.filter(
				image => image["PALABRAS CLAVES"] === this.props.keyword
				);
		this.setState({
			images: images,
			imagesTotal: images.length
		})
	}

	buildImageUrl(key) {
		if(this.state.images[key] !== undefined) {
			return "./static/material/" + this.state.images[key].ID.toUpperCase() + ".jpg" ;
		}
	}

	buildImageTitle(key) {
		if(this.state.images[key] !== undefined) {
			return this.state.images[key]["TITULO"];
		}
	}

	curImage() {
		if(this.state.images.length > 0) {
			return <img key={this.state.curImage} src={this.buildImageUrl(this.state.curImage)} title={this.buildImageTitle(this.state.curImage)}/>	
		};
	}

	nextImage() {
		let next = 0;
		if(this.state.imagesTotal - 1 !== this.state.curImage) {
			next = this.state.curImage + 1;
		}
		console.log(next);
		this.setState({
			curImage: next
		})
	}

	prevImage() {
		let prev = this.state.imagesTotal -1;
		if(this.state.imagesTotal !== this.state.curImage) {
			prev = this.state.curImage - 1;
		}
		console.log(prev);
		this.setState({
			curImage: prev
		})
	}

	render() {
		
		return(
			<div>
				<div className="Gallery" onClick={this.nextImage}>
					{this.curImage()}
				</div>
				<style jsx>{
					`
					.Gallery {
						overflow:hidden;
						margin:24px 0;
					}
					img {
						max-width:20%;
						float:left;
						height:auto;
						margin-right:1.5%;
						margin-bottom:1.5%;
					}
					`
				}</style>
			</div>
		)
	}
}

export default Gallery