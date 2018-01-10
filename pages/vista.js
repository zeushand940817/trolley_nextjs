import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import Panorama from '../components/MarzipanoView.js'

const Vista  = (props) =>  (
  <Layout>
    <h1>Vista 360</h1>
   <Panorama/>
  </Layout>
  )
  
export default Vista
