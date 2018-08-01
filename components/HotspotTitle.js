const HotspotTitle = props => (
	<div>
	<h2 className={props.class} >{props.title}</h2>
	<style jsx>{`
		h2.active {
		position: fixed;
		top:0;
		left:0;
		width: 100%;
		font-family: 'Barrio', sans-serif;
		text-align:center;
		margin: 6px 0;
		}
		`}
	</style>
	</div>
)

export default HotspotTitle;