import { Container } from "react-bootstrap";

import TokenList from "../../components/chart/tokenlist";
import Layout from "../../components/layout";
import axios from "axios";

export default function Chart({...props}) {

    let address   = "0x42981d0bfbaf196529376ee702f2a9eb9092fcb5";
    let chart_url = "https://dexscreener.com/bsc/"+address+"?embed=1&theme=dark&info=1";

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

            <TokenList tokens={props.tokens}/>

            <Container className="my-4">
                <iframe 
                    height={800} 
                    width="100%" 
                    src={chart_url} />
            </Container>
        </Layout>
    )
}

Chart.getInitialProps = async({ req }) => {
    let api_url = process.env.NEXT_PUBLIC_API_URL;
    let tokens = await axios.get(api_url+"/tokens");

    return {
        tokens: tokens.data
    }
}