import config from '../config.js'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const Index = (props) =>  (
  <Layout>
    <h1>{ config.project_name }</h1>
    <p>{ config.project_intro }</p>
  </Layout>
  )
  

export default Index
