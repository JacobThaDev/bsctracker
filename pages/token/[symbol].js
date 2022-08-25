import Layout from "../../components/Layout";
import MarketStats from "../../components/home/MarketStats";
import PairList from "../../components/home/PairList";
import TradingView from "../../components/home/TradingView";
import Navbar from "../../components/global/Navbar";
import GridRow from "../../components/grid/Row";
import GridContainer from "../../components/grid/Container";
import GridCol from "../../components/grid/Column";
import Footer from "../../components/global/Footer";
import { useTracker } from "../../context/tracker";
import { useEffect } from "react";
import Leaderboard from "../../components/tracker/Leaderboard";
import {Card, Text} from "@nextui-org/react";

export default function TokenPage({ ...props }) {

    const { active, setActive, tokens } = useTracker();

    useEffect(() => {
        if (!tokens) {
            return;
        }

        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].symbol.toLowerCase() === props.symbol.toLowerCase()) {
                setActive(tokens[i]);
                break;
            }
        }
    }, [tokens]);

    return(
        <Layout>
            <Navbar/>

            <div className="content">
                <GridContainer>
                    <GridRow>
                        <GridCol>
                            { active && <MarketStats />}
                        </GridCol>
                    </GridRow>
                    <GridRow>
                        <GridCol lg={8}>
                            <TradingView/>
                        </GridCol>
                        <GridCol lg={4}>
                            <PairList />
                        </GridCol>
                    </GridRow>
                </GridContainer>
            </div>

            <Footer/>
        </Layout>
    )
}

export async function getServerSideProps(request) {
    const { symbol } = request.query;

    return {
        props: {
            symbol: symbol
        }, // will be passed to the page component as props
    }
}