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
import PageHeader from "../../components/global/header";

const tokens = require("../../tokens");

export default function TokenPair({ activeSymbol, pairId }) {

    const [stats, setStats]   = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasData, setHasData] = useState(true);

    useEffect(async() => {
        await update();
    }, [activeSymbol, pairId]);

    const changePairId = async(selection) => {
        if (pairId == selection) {
            return;
        }
        setPairId(selection);
    }

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
            if (values[1].pairs.length == 0) {
                setHasData(false);
            }

            let stats = {};

            for (let i = 0; i < values[1].pairs.length; i++) {
                if (values[1].pairs[i].pairAddress.toLowerCase() == pairId.toLowerCase()) {
                    stats = values[1].pairs[i];
                    break;
                }
            }

            return {
                bnb_value: values[0],
                stats:  stats,
                burned: values[2],
                supply: values[3],
                holders: values[4].data.data.ethereum.transfers[0].receiver_count,
                pairs: values[1].pairs
            };
        });

        setIsLoading(false);
        setStats(stats);
    }

    return(
        <Layout title={`${activeSymbol.toUpperCase()}`}>
            <PageHeader 
                title={tokens[activeSymbol].title} 
                desc={tokens[activeSymbol].contract}/>

            <Container gap={2} css={{ mt:-35 }}>
                
                <Grid.Container gap={1}>
                    <Grid xs={12}>
                        <TokenList 
                            reloadHandler={update}
                            active={activeSymbol} 
                            isLoading={isLoading}
                            data={stats}/>
                    </Grid>

                     { hasData ? 
                    <>
                        <Grid xs={12} sm={4} md={4}>
                            <PoolsCard 
                                pairId={pairId}
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
                    </> : 
                    <>
                        <Grid xs={12}>
                            <Card>
                                <Card.Body>
                                    <Grid.Container alignItems="center">
                                        <Grid css={{ mr: 10 }}>
                                            <Text color="error" css={{ lh: 1.2 }}>
                                                <SvgIcon icon="alert-circle" size={48} stroke={1.5} />
                                            </Text>
                                        </Grid>
                                        <Grid>
                                            <Text color="error" css={{ lh: 1.2 }}>
                                                There is no data for this token. This could imply that this token has no trading volume.
                                                We advise you do your own research.<br/>Sorry for the inconvenience!
                                            </Text>
                                        </Grid>
                                    </Grid.Container>
                                    
                                    
                                </Card.Body>
                            </Card>
                        </Grid>
                    </>
                }
                </Grid.Container>
            </Container>
        </Layout>
    )

}


TokenPair.getInitialProps = ({ query }) => {
    const { symbol, pair } = query;

    return {
        activeSymbol: symbol,
        pairId: pair
    }
}