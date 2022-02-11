import Cookies from "js-cookie";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PageHead({...props}) {

    const router = useRouter();
    const [loaded, setLoaded] = useState(false);

    if (!props || !props.title)
        props.title = "Home";
    if (!props || !props.desc)
        props.desc = "A complete modern approach to aid you in your DeFi journey.";
    
    useEffect(() => {
        let toggles = document.querySelectorAll("[id=themeToggle]");

        if (Cookies.get("theme") == "dark") {
            changeIcon(toggles, "dark");
        }

        if (!loaded) {
            toggles.forEach((toggle, index) => {
                toggle.addEventListener("click", function(event) {
                    event.preventDefault();
                    let stored = Cookies.get("theme");

                    if (stored == "dark") {
                        Cookies.set("theme", "light", { path: '/', expires: 365 });
                    } else {
                        Cookies.set("theme", "dark", { path: '/', expires: 365 });
                    }
                    
                    router.replace(router.asPath);
                });
            });

            setLoaded(true);
        }
    }, []);

    const changeIcon = (toggles, theme) => {
        toggles.forEach((toggle) => {
            if (theme == "dark") {
                toggle.innerHTML = "<i class=\"fas fa-sun-alt fa-fw\"></i>";
            } else if (theme == "light") {
                toggle.innerHTML = "<i class=\"fas fa-moon fa-fw\"></i>";
            }
        });
    }

    const getTheme = () => {
        let theme;

        if (Cookies.get("theme") == "dark") {
            theme = "/css/themes/dark.css";
        } else {
            theme = "/css/themes/light.css";
        }
        
        return <link rel="stylesheet" href={theme} />;
    }

    return(
        <Head>
            <title>{props.title && props.title} | BscTracker</title>
            <meta name="description" content={props.desc && props.desc} />
            <meta name="keywords" content="bsctracker,glowtoken,enhance,evergrow,safemoon,safemars,safegalaxy,bitcoin,dogecoin,doge,defi,coinbase,coinmarketcap,coinmarket,bscscan,whitebit,coingecko,cryptocurrency,crypto,pancakeswap,dex,etherium,eth,btc"/>
            <script type='text/javascript' src='https://storage.ko-fi.com/cdn/widget/Widget_2.js'></script>
            <link rel="icon" href="/favicon.ico" />
            
            {getTheme()}
        </Head>
    )
}