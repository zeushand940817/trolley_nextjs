import Link from 'next/link'
import Head from './Head.js'

const linkStyle = {
  marginRight: 15
}

const Header = () => (
<div>
  <Head/> 
      <Link href="/">
        <a style={linkStyle}>Home</a>
      </Link>
      <Link href="/about">
        <a style={linkStyle}>About</a>
      </Link>
      <Link href="vista">
        <a style={linkStyle}>Vista 360</a>
      </Link>
    </div>
    )

export default Header
