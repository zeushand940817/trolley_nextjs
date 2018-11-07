class ImageData extends React.Component {
	constructor(props) {
		super(props);
	}

	checkEmpty(field, label) {
		let itemData = this.props.data[field];
		if (itemData !==  undefined && itemData.length > 0) {
			return (
				<React.Fragment>
					<li>
						<span className="label">{label}:</span>{" "}
						{itemData}
					</li>
					<style jsx>{`
						li {
							list-style: none;
							margin-bottom: 12px;
							padding: 0;
						}

						span.label {
							font-weight: bold;
						}
					`}</style>
				</React.Fragment>
			);
		}
	}

	render() {
		return (
			<div className="dataWrapper">
				<div className="imageData">
					<h2>Ficha técnica</h2>
					<img className="refimage" src={this.props.image} title={this.props.data['dc.title']} />
					<ul>
						{this.checkEmpty("dc.title", "Título")}
						{this.checkEmpty("dc.title.alternative", "Otro título")}
						{this.checkEmpty("dc.subject", "Campo disciplinar")}
						{this.checkEmpty(
							"dc.description.tableofcontents",
							"Descripción"
						)}
						{this.checkEmpty(
							"dc.contributor.author",
							"Autor principal"
						)}
						{this.checkEmpty(
							"dc.contributor.other",
							"Otro(s) autor(es)"
						)}
						{this.checkEmpty("dc.date.issued", "Fecha de obra")}
						{this.checkEmpty("dc.relation.ispartofseries", "Serie")}
						{this.checkEmpty("dc.type", "Tipo de documento")}
						{this.checkEmpty(
							"dc.format.medium",
							"Descripción del original"
						)}
						{this.checkEmpty("dc.format.extent", "Extensión")}
						{this.checkEmpty("dc.propietario", "Propietario")}
					</ul>
				</div>
				<style jsx>{`
					.imageData {
						padding: 24px;
						color: white;
						font-family: "Special Elite", monospace;
						font-size: 14px;
					}

					.dataWrapper {
						overflow: auto;
						max-height: 100%;
					}

					img.refimage {
						position: absolute;
						right: 12px;
						top: 38px;
						max-width: 120px;
						height: auto;
					}

					ul {
							margin: 0;
							padding: 0 132px 0 0;
						}

					ul > li {
						line-height: 1.4em;
					}

					h2 {
						font-family: "Special Elite", monospace;
					}

					@media screen and (max-width: 768px) {
						img.refimage {
							max-width: 36px;
						}

						ul {
							padding-right: 42px;
						}
					}
				`}</style>
			</div>
		);
	}
}

export default ImageData;
