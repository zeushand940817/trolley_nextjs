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
  
  Index.getInitialProps = async function() {
    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
    const data = await res.json()

    console.log(`Show data fetched. Count: ${data.length}`)

    return {
      shows: data
    }
  }
 
export default Index
