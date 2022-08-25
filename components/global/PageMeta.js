import Head from "next/head";

export default function PageMeta({ title, desc }) {

    return(
        <Head>
            <title>{title ? title : "Home"} |  BscTracker</title>
            <meta name="description" content={desc && desc} />
            <meta name="keywords" content="nft,marketplace,crypto,btc,eth,bitcoin,ethereum,safemoon,bsc,bsctracker,uniswap,pancakeswap"/>
            <link rel="shortcut icon" type="image/png" href="/img/favicon.png"/>
        </Head>
    )
}