import Link from 'next/link'
import Head from './Head.js'

const headStyle = {
  background: "#000",
  position: "absolute",
  top: 0,
  left: 0,
  "z-index":10
}

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
  <Head style={headStyle}/>
      <img style={logoStyle} width="100" height="47" src="./static/imgs/eltrolley.png" title="El Trolley"/>
      <nav style={navStyle}>
      <Link href="/about">
        <a style={linkStyle}>Acerca de</a>
      </Link>
      <Link href="vista">
        <a style={linkStyle}>VRI</a>
      </Link>
      </nav>
    </div>
    )

export default Header
