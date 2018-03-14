import Link from 'next/link'
import Head from './Head.js'


const linkStyle = {
  marginRight: 15,
  color: "white",
  textDecoration: "none"
}

const navStyle = {
  paddingTop: 12,
  paddingLeft: 12,
  lineHeight: "16px"
}

const logoStyle = {
  float: "left",
  marginRight: 15
}

const Header = () => (
<div>
  <Head/>
      <div className="tr_header">
        <img className="tr_logo" width="100" height="47" src="./static/imgs/eltrolley.png" title="El Trolley"/>
        <nav className="tr_nav">
        <Link href="/">
          <a className="tr_link">Inicio</a>
        </Link>
        <Link href="/about">
          <a className="tr_link">Acerca de</a>
        </Link>
        <Link href="vista">
          <a className="tr_link">VRI</a>
        </Link>
        </nav>
      </div>
      <style jsx>{
        `
        .tr_header {
          padding:6px;
        }
        .tr_logo {
          float:left;
          margin-right:15px;
        }
        .tr_nav {
          padding:12px 0 0 12px;
        }
        .tr_link {
          margin-right:15px;
          color:white;
          text-decoration:none;
        }
        .tr_link:hover {
          color:#E34F35;
        }
        `
      }</style>
</div>
    )

export default Header
