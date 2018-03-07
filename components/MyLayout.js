import Header from './Header'

const layoutStyle = {
  height: "100%",
  minHeight: "100%",
  overflow: "hidden"
}

const Layout = (props) => (
    <div style={layoutStyle}>
      <Header />
      {props.children}
     </div>
    )

export default Layout
