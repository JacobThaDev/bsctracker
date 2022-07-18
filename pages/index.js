import { useEffect, useState } from "react";
import { Container, Grid } from '@nextui-org/react'
import PageHeader from '../components/global/header';
import PriceCard from "../components/home/stats/price";
import MarketCard from "../components/home/stats/market";
import BurnCard from "../components/home/stats/burn";
import LiquidityCard from "../components/home/stats/liquidity";
import VolumeCard from "../components/home/stats/volume";
import Token from "../helpers/Token";
import Binance from "../helpers/Binance";
import axios from "axios";
import PoolsCard from "../components/home/stats/pools";
import StrengthCard from "../components/home/stats/strength";
import DexChart from "../components/home/dex_chart";
import TokenList from "../components/tokenlist";
import Layout from "../components/global/layout";

const tokens = require("../tokens");

export default function Home() {

    // the default token to show
    const symbol = "sfm";
    
    const [pairId, setPairId] = useState(0);
    const [stats, setStats]   = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(async() => {
        await update();
    }, [pairId]);

    const update = async() => {
        setIsLoading(true);
        let bnb      = Binance.getBnbPrice();
        let base_url = "https://api.dexscreener.com/latest/dex/tokens/";
        let request  = axios.get(base_url + tokens[symbol].contract).then(res => res.data);
        let burned   = Token.getBurned(tokens[symbol]);
        let supply   = Token.getSupply(tokens[symbol]);
        let holders  = Token.getHolders(tokens[symbol]);

        let stats = await Promise.all([
            bnb, request, burned, supply, holders
        ]).then((values) => {
            return {
                bnb_value: values[0],
                stats:  values[1].pairs[pairId],
                burned: values[2],
                supply: values[3],
                holders: values[4].data.data.ethereum.transfers[0].receiver_count,
                pairs: values[1].pairs
            };
        });
        
        setStats(stats);
        setIsLoading(false);
    }

    const changePairId = (selection) => {
        if (selection == pairId) {
            return;
        }
        setPairId(selection);
    }

    return (
        <Layout title="Home">
            <PageHeader title={tokens[symbol].title} desc={tokens[symbol].contract}/>
            <Container gap={2} css={{ mt:-35 }}>
                
                <Grid.Container gap={1}>
                    <Grid xs={12}>
                        <TokenList 
                            active={symbol} 
                            data={stats}
                            isLoading={isLoading}
                            reloadHandler={update} />
                    </Grid>

                    <Grid xs={12} sm={4} md={4}>
                        <PoolsCard 
                            symbol={symbol} 
                            stats={stats} 
                            isLoading={isLoading}
                            activeIndex={pairId}
                            pairHandler={changePairId}/>
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