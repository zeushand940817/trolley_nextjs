import { CSSTransitionGroup } from 'react-transition-group' // ES6

class PointsList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isActive: false,
			animation: 'animated fadeInLeft'
		}
	}

	componentDidMount() {
		
	}

	showLista() {
		if(this.state.isActive === true) {
			this.setState({
				isActive: false
			})
		} else {
			this.setState({
				isActive: true
			})
		}
	}

	componentDidUpdate(prevProps, prevState) {

	}

	render() {
		const isActiveNavi = () => {
			if(this.state.isActive === true) {
				return(
					<div>
						<div className="navi active">
							<ul>
							{this.props.hotspots.map((hotspot)=>
								<li className={this.props.activeKey === hotspot.id ? 'active' : ''} onClick={ () => this.props.setPos(hotspot.position, hotspot.id) } position={hotspot.position} key={hotspot.id}>{hotspot.title}</li>
								)}
							</ul>
						</div>
						<style jsx>
						{
							`
							.navi {
								position: absolute;
								top:0;
								left:0;
								width:300px;
								z-index:2;
								display:block;
							}
							
							ul {
								margin:90px 0 0 -60px;
								padding:0;
							}

							li {
								list-style:none;
								cursor:pointer;
								font-family:'Barrio', sans-serif;
								font-size:24px;
								color:white;
								background-color:#000;
								margin:10px 0;
								padding:12px 6px 6px 102px;
								transform: rotate3d(0, 0, 1,-15deg);
								display:block;
								border-right:5px solid white;
							}
							li.active, li:hover {
								color:#E34F35;
							}
						`}
						</style>
				</div>
				)
			}
		}
		if(this.props.hotspots !== undefined) {
		return(
			<div>
			<div className="button" onClick={this.showLista.bind(this)}>
				<i className="fas fa-bars"></i>
			</div>
			<style jsx>{
				`
				.button {
					position: absolute;
					top:0;
					left:0;
					background-color:white;
					color:black;
					padding:6px;
					z-index:10;
				}
				.button:hover {
					background-color:black;
					color:white;
				}
				`
			}</style>
			{isActiveNavi()}
			</div>
		)
		} else {
			return(
				<div>
					<div className="navi"></div>
				</div>
				)
		}
	}

}

export default PointsList