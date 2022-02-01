import Head from "next/head";


export default function PageHead({...props}) {

    if (!props || !props.title)
        props.title = "Home";
    if (!props || !props.desc)
        props.desc = "A complete modern approach to aid you in your DeFi journey.";
    
    return(
        <Head>
            <title>{props.title && props.title} | BscTracker</title>
            <meta name="description" content={props.desc && props.desc} />
            <script type='text/javascript' src='https://storage.ko-fi.com/cdn/widget/Widget_2.js'></script>
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}