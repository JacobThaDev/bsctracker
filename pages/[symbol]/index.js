import { useEffect, useState } from "react";
import { Container, Grid } from "@nextui-org/react";

import DexChart from "../../components/home/dex_chart";
import BurnCard from "../../components/home/stats/burn";
import LiquidityCard from "../../components/home/stats/liquidity";
import MarketCard from "../../components/home/stats/market";
import PoolsCard from "../../components/home/stats/pools";
import PriceCard from "../../components/home/stats/price";
import StrengthCard from "../../components/home/stats/strength";
import VolumeCard from "../../components/home/stats/volume";
import axios from "axios";
import Token from "../../helpers/Token";
import Binance from "../../helpers/Binance";
import TokenList from "../../components/tokenlist";
import Layout from "../../components/global/layout";
import ErrorPage from 'next/error'
import PageHeader from "../../components/global/header";

const tokens = require("../../tokens");

export default function TokenStats({ activeSymbol, err }) {

    if (err) {
        return <ErrorPage statusCode={err.statusCode} />
    }

    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(async() => {
        await update();
    }, [activeSymbol]);

    const update = async() => {
        setIsLoading(true);
        let bnb      = Binance.getBnbPrice();
        let base_url = "https://api.dexscreener.io/latest/dex/tokens/";
        let request  = axios.get(base_url + tokens[activeSymbol].contract).then(res => res.data);
        let burned   = Token.getBurned(tokens[activeSymbol]);
        let supply   = Token.getSupply(tokens[activeSymbol]);
        let holders  = Token.getHolders(tokens[activeSymbol]);

        let stats = await Promise.all([
            bnb, request, burned, supply, holders
        ]).then((values) => {
            return {
                bnb_value: values[0],
                stats:  values[1].pairs[0],
                burned: values[2],
                supply: values[3],
                holders: values[4].data.data.ethereum.transfers[0].receiver_count,
                pairs: values[1].pairs
            };
        });

        setStats(stats);
        setIsLoading(false);
    }

    return(
        <Layout title={`${activeSymbol.toUpperCase()}`} >
            <PageHeader title={tokens[activeSymbol].title} desc={tokens[activeSymbol].contract}/>

            <Container gap={2} css={{ mt:-35 }}>
                <Grid.Container gap={1}>
                    <Grid xs={12}>
                        <TokenList 
                            reloadHandler={update}
                            active={activeSymbol} 
                            isLoading={isLoading}
                            data={stats}/>
                    </Grid>
                    <Grid xs={12} sm={4} md={4}>
                        <PoolsCard 
                            symbol={activeSymbol} 
                            stats={stats}
                            isLoading={isLoading}
                            activeIndex={0}/>
                    </Grid>
                    <Grid xs={12} sm={4} md={4}>
                        <PriceCard data={stats}/>
                    </Grid>
                    <Grid xs={12} sm={4} md={4}>
                        <MarketCard data={stats}/>
                    </Grid>
                    <Grid xs={12} sm={4} md={4}>
                        <BurnCard data={stats}/>
                    </Grid>
                    <Grid xs={12} sm={4} md={4}>
                        <LiquidityCard data={stats}/>
                    </Grid>
                    <Grid xs={12} sm={4}>
                        <VolumeCard data={stats}/>
                    </Grid>
                    <Grid xs={12}>
                        <StrengthCard data={stats}/>
                    </Grid>
                    <Grid xs={12}>
                        <DexChart data={stats}/>
                    </Grid>
                </Grid.Container>
            </Container>
        </Layout>
    )

}


TokenStats.getInitialProps = ({ query }) => {
    const symbol = query.symbol;
    const tokens = require("../../tokens");
    
    if (!tokens[symbol]) {
        return { 
            err: { statusCode: 404 } }
    }
    return {
        activeSymbol: symbol
    }
}