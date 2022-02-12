import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import axios from "axios";

import Layout from "../../components/layout";
import TokenList from "../../components/chart/tokenlist";
import StarField from "../../components/starfield";

export default function Chart({ ...props }) {

    const router     = useRouter();
    const {chartId}  = router.query;
    
    let selected;

    for (let token of props.tokens) {
        if (token.symbol.toLowerCase() == chartId.toLowerCase()) {
            selected = token;
        }
    }
    
    if (!chartId || !selected) {
        return null;
    }

    return(
        <Layout title={selected.title}>
            <div className="small-header">
                <Container>
                    <h2 className="text-white fw-bold mb-0">
                        {selected.title} Chart
                    </h2>
                </Container>
            </div>

            <TokenList tokens={props.tokens} active={selected}/>

            <Container className="my-4">
                <iframe 
                    height={800} 
                    width="100%" 
                    src={"https://dexscreener.com/bsc/"+selected.contract+"?embed=1&theme=dark&info=1"}/>
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