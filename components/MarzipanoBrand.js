import Link from "next/link";

const MarzipanoBrand = () => (
	<div>
		<div className="tr_header">
			<img
				className="tr_logo"
				width="100"
				height="47"
				src="./static/imgs/eltrolley.png"
				title="El Trolley"
			/>
			<nav className="tr_nav">
				<Link href="/">
					<a className="tr_link">VRI</a>
				</Link>
				<Link href="/about">
					<a className="tr_link">Acerca de</a>
				</Link>
			</nav>
		</div>
		<style jsx>{`
			.tr_header {
				padding: 6px;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 1;
			}
			.tr_logo {
				float: left;
				padding: 12px;
				background-color: #000;
				opacity: 0.8;
				transform: rotate3d(0, 0, 1, -13deg);
			}
			.tr_nav {
				padding: 12px 0 0 12px;
				display: none;
			}
			.tr_link {
				margin-right: 15px;
				color: white;
				text-decoration: none;
			}
			.tr_link:hover {
				color: #e34f35;
			}
		`}</style>
	</div>
);

export default MarzipanoBrand;
