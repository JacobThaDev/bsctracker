import Layout from "../components/Layout";
import MarketStats from "../components/home/MarketStats";
import PairList from "../components/home/PairList";
import TradingView from "../components/home/TradingView";
import Navbar from "../components/global/Navbar";
import GridRow from "../components/grid/Row";
import GridContainer from "../components/grid/Container";
import GridCol from "../components/grid/Column";
import Footer from "../components/global/Footer";
import { useTracker } from "../context/tracker";
import Leaderboard from "../components/tracker/Leaderboard";
import {Text} from "@nextui-org/react";

export default function Homepage() {

    const { active, tokens } = useTracker();

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
                        <GridCol def={12} xl={8}>
                            <TradingView/>
                        </GridCol>
                        <GridCol def={12} xl={4}>
                            <PairList />
                        </GridCol>
                    </GridRow>
                </GridContainer>
            </div>

            <Footer/>
        </Layout>
    )
}