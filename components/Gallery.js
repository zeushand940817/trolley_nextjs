
class Gallery extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			images: []
		}
	}

	componentDidMount() {
		this.setState({
			images: this.props.data.filter(
				image => image["PALABRAS CLAVES"] === this.props.keyword
				)
		})
	}

	render() {
		return(
			<div>
				<div className="Gallery">
					{this.state.images.map((image) => (
						<img src={'./static/material/' + image.ID.toUpperCase() + '.jpg'} title={image["TITULO"]}/>
						))}
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