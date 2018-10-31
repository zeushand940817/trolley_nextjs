import Link from "next/link";

const MarzipanoBrand = (props) => (
	<div>
		<div className={`tr_header visible-${props.visible}`}>
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
				z-index: 1;
				transition: all ease-in 0.5s;
			}

			.tr_header.visible-true {
				left: 0;
				opacity: 1;
			}

			.tr_header.visible-false {
				left: -217px;
				opacity: 0;
				transition: all ease-out 0.5s;
			}

			.tr_logo {
				float: left;
				padding: 6px;
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
