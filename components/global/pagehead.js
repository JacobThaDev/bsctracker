import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function PageHead({...props}) {

    const [showKofi, setShowKofi] = useState(false);

    useEffect(() => {
        if (!window || !document) {
            return;
        }
        setShowKofi(true);
    }, []);

    if (!props || !props.title)
        props.title = "Home";
    if (!props || !props.desc)
        props.desc = "A complete modern approach to aid you in your DeFi journey. Check your balance, value, charts, and more.";

    return (
        <Head>
            <title>{props.title && props.title} | BscTracker</title>
            <meta name="description" content={props.desc && props.desc} />
            <meta name="keywords" content="safemoon,evergrow,affinity,glowtoken,puli,bsc,binance,binance us,candlestick,charts,crypto"/>
            <link rel="shortcut icon" type="image/png" href="/img/favicon.png"/>

            <script src="https://www.googletagmanager.com/gtag/js?id=G-REW4XSSDZE" />

            <script
                dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-REW4XSSDZE', { page_path: window.location.pathname });
                    `,
                }}
            />
        </Head>
    )
}