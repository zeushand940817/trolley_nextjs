import Link from 'next/link'
import Head from './Head.js'

const headStyle = {
  padding: 6
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
  <Head/>
      <div style={headStyle}>
        <img style={logoStyle} width="100" height="47" src="./static/imgs/eltrolley.png" title="El Trolley"/>
        <nav style={navStyle}>
        <Link href="/">
          <a style={linkStyle}>Inicio</a>
        </Link>
        <Link href="/about">
          <a style={linkStyle}>Acerca de</a>
        </Link>
        <Link href="vista">
          <a style={linkStyle}>VRI</a>
        </Link>
        </nav>
      </div>
    </div>
    )

export default Header
