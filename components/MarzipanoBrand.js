import Link from "next/link";

const MarzipanoBrand = () => (
	<div>
		<div className="tr_header">
			<img
				className="tr_logo"
				src="./static/imgs/eltrolley.png"
				title="El Trolley"
			/>
		</div>
		<style jsx>{`
			.tr_header {
				padding: 0;
				position: fixed;
				top: 0;
				left: 0;
				z-index: 1;
			}
			.tr_logo {
				float: left;
				padding: 12px;
				background-color: #000;
				width: 211px;
				height: auto;
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

			@media screen and (max-width: 768px) {
				.tr_logo {
					max-width: 120px;
				}
			}
		`}</style>
	</div>
);

export default MarzipanoBrand;
