import Head from "next/head";

export default function PageMeta({ title, desc }) {

    return(
        <Head>
            <title>{title ? title : "Home"} |  BscTracker</title>
            <meta name="viewport" content="width=device-width, initial-scale=0.87, shrink-to-fit=no" />
            <meta name="description" content={desc && desc} />
            <meta name="keywords" content="nft,marketplace,crypto,btc,eth,bitcoin,ethereum,safemoon,bsc,bsctracker,uniswap,pancakeswap"/>
            <link rel="shortcut icon" type="image/png" href="/img/favicon.png"/>
        
            <meta property='og:image' content='https://i.imgur.com/Q0DSVfk.png' />
            <meta property="og:image:type" content="image/png"/>
            <meta property="og:image:width" content="1280"/>
            <meta property="og:image:height" content="640"/>
            <meta name="twitter:title" content={(title ? title : "Home")+" | BscTracker"}/>
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:site" content="@OG_KingFox"/>
            <meta name="twitter:description" content={desc}/>
            
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-REW4XSSDZE"></script>
            <script dangerouslySetInnerHTML={{ __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-REW4XSSDZE');` }} />
        </Head>
    )
}