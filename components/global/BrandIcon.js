import Facebook from "../../public/img/icons/brands/facebook.svg";
import Gmail from "../../public/img/icons/brands/gmail.svg";
import Instagram from "../../public/img/icons/brands/instagram.svg";
import Reddit from "../../public/img/icons/brands/reddit.svg";
import Tiktok from "../../public/img/icons/brands/tiktok.svg";
import Twitter from "../../public/img/icons/brands/twitter.svg";
import Youtube from "../../public/img/icons/brands/youtube.svg";
import Discord from "../../public/img/icons/brands/discord.svg";

const iconTypes = {
    facebook: Facebook,
    gmail: Gmail,
    instagram: Instagram,
    reddit: Reddit,
    tiktok: Tiktok,
    twitter: Twitter,
    youtube: Youtube,
    discord: Discord,
}

export default function BrandIcon({ icon, size, className }) {

    if (!iconTypes[icon])
        return null;

    let Icon = iconTypes[icon];
    return <Icon className={className} style={{ fill: "currentColor", width: size, height: size }}/>
}