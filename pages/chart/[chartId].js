import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import axios from "axios";

import Layout from "../../components/layout";
import TokenList from "../../components/chart/tokenlist";
import { useEffect, useState } from "react";
import ErrorPage from "../../components/error";
import Loader from "../../components/loader";

export default function Chart({ ...props }) {

    const [tokens, setTokens] = useState(null);
    const [active, setActive] = useState(null);
    const [error, setError]   = useState(null);

    useEffect(async() => {
        let chartId = props.chartId;
        let tokens  = await axios.get("/api/tokens").then((res) => res.data);
        setTokens(tokens);

        let active;

        for (let token of tokens) {
            
            if (token.symbol.toLowerCase() == chartId) {
                active = token;
                break;
            }
        }

        if (!active) {
            setError("Invalid token symbol.");
        } else {
            setActive(active);
        }
    }, []);

    if (!active) {
        return <Loader/>;
    }

    if (error) {
        return <ErrorPage />
    }

    return(
        <Layout 
            title={active.title+" Chart"}
            desc={active.title+" chart, price, trades, and volume information."}>

            <div className="small-header">
                <Container>
                    <h2 className="text-white fw-bold mb-0">
                        {active.title} Chart
                    </h2>
                </Container>
            </div>

            <TokenList tokens={tokens} active={active}/>

            <Container className="my-4">
                {!active ? "" : 
                <iframe 
                    height={800} 
                    width="100%" 
                    src={"https://dexscreener.com/bsc/"+active.contract+"?embed=1&theme=dark&info=1"}/>
                }
            </Container>
        </Layout>
    )
}

Chart.getInitialProps = async({ query }) => {
    const { chartId } = query;

    return {
        chartId: chartId
    }
    
}