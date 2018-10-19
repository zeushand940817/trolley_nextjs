import Head from "next/head";
import config from "../config.js";

export default () => (
  <div>
    <Head>
      <title>
        {config.project_name} - {config.project_shortdesc}
      </title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
      />
      <link
        rel="stylesheet"
        href="https://unpkg.com/purecss@1.0.0/build/pure-min.css"
        media="screen"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Barrio|Special+Elite"
        rel="stylesheet"
      />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="./static/base.css" media="screen" />
      <link rel="stylesheet" href="./static/video-react.css" media="screen" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="./static/icons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="./static/icons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="./static/icons/favicon-16x16.png"
      />
      <link rel="manifest" href="./static/icons/site.webmanifest" />
      <link
        rel="mask-icon"
        href="./static/icons/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <link rel="shortcut icon" href="./static/icons/favicon.ico" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta
        name="msapplication-config"
        content="./static/icons/browserconfig.xml"
      />
      <meta name="theme-color" content="#000000" />
    </Head>
  </div>
);
