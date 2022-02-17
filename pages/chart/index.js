import { Container } from "react-bootstrap";

import TokenList from "../../components/chart/tokenlist";
import Layout from "../../components/layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Chart({...props}) {

    const [tokens, setTokens] = useState(null);
    const [active, setActive] = useState(null);

    useEffect(async() => {
        let tokens = await axios.get("/api/tokens").then((res) => res.data);
        setTokens(tokens);
        setActive(tokens[0]);
    }, []);

    if (!tokens || !active) {
        return null;
    }

    return(
        <Layout 
            title="SafeMoon Chart"
            desc="SafeMoon chart, price, trades, and volume information.">

            <div className="small-header">
                <Container>
                    <h2 className="text-white fw-bold mb-0">
                        SafeMoon Chart
                    </h2>
                </Container>
            </div>

            <TokenList tokens={tokens}/>

            <Container className="my-4">
            <iframe 
                    height={800} 
                    width="100%" 
                    src={"https://dexscreener.com/bsc/"+active.contract+"?embed=1&theme=dark&info=1"}/>
            </Container>
        </Layout>
    )
}