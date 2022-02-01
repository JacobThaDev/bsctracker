import { useRouter } from "next/router";
import ChartHeader from "../../components/chart/header";
import TokenList from "../../components/chart/tokenlist";
import PageHead from "../../components/global/head";
import PageNav from "../../components/global/navigation";
import Footer from "../../components/global/footer";
import { Container } from "react-bootstrap";

export default function Chart() {

    const router     = useRouter();
    const {chartId}  = router.query;
    const tokens     = require("../../tokens");
    let keysList     = Object.keys(tokens);

    if (!chartId || !keysList.includes(chartId)) {
        return null;
    }

    let token = tokens[chartId].address;

    return(
        <>
            <PageHead title={tokens[chartId].title}/>
            <PageNav/>
            <ChartHeader token={tokens[chartId]} />
            <TokenList />

            <Container className="my-4">
                <iframe 
                    height={800} 
                    width="100%" 
                    src={"https://dexscreener.com/bsc/"+token+"?embed=1&theme=dark&info=1"}/>
            </Container>

            <Footer/>
        </>
    )
}