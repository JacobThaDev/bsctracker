import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function TokenInfo({...props}) {

    const [token, setToken] = useState(null);
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        let currentTheme = Cookies.get("theme");
        if (currentTheme) {
            setTheme(currentTheme);
        }
        setToken(props.token);
    }, [props]);

    if (!theme || !token) {
        return null;
    }

    return (
        <iframe className="shadow-sm overflow-hidden"
            height={700} 
            width="100%" 
            src={"https://dexscreener.com/bsc/"+token.contract+"?embed=1&theme="+theme+"&info=1"}/>
    )
}