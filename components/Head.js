import Head from 'next/head'
import config from '../config.js'

export default() =>
   <div>
    <Head>
      <title>{config.project_name} - {config.project_shortdesc}</title>
      <meta name="viewport" content="target-densitydpi=device-dpi, width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, minimal-ui" />    
      <link rel="stylesheet" href="https://unpkg.com/purecss@1.0.0/build/pure-min.css" media="screen"/>
      <link href="https://fonts.googleapis.com/css?family=Barrio" rel="stylesheet"/> 
      <link rel="stylesheet" href="./static/base.css" media="screen"/>
      <script defer src="https://use.fontawesome.com/releases/v5.0.8/js/all.js"></script>
    </Head>
   </div>
