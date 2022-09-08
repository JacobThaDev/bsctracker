import { 
    Container, Text, Progress, Grid, Badge, Image, Avatar 
} from "@nextui-org/react";

import Layout from "../../components/Layout";
import PageNav from "../../components/global/PageNav";
import Footer from "../../components/global/Footer";
import { useTracker } from "../../context/tracker";
import { useEffect, useState } from "react";
import TradingChart from "../../components/token/chart";
import TokenPairs from "../../components/token/pairs";
import Functions from "../../helpers/Functions";
import Link from "next/link";
import Token from "../../helpers/Token";

export default function TokenPage({ ...props }) {

    const { 
        active, pairId, setActive, tokens, time,
        circulating, txnData, price, setPrice
    } = useTracker();

    const [ mcap, setMcap ] = useState(0);
    const [ liquidity, setLiquidity ] = useState(0);

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

    useEffect(() => {
        if (!active || active.pairs.length > 0) {
            return;
        }

        setMcap(null);

        let token  = new Token(active.contract, active.primaryPool);
        let price  = token.getPrice();
        let supply = token.getSupply();
        let pool   = token.getPoolInfo();

        Promise.all([ price, supply, pool ]).then((result) => {
            setPrice(result[0].toFixed(active.decimals));
            setMcap(result[0] * result[1]);
            setLiquidity(result[2].value)
        })

        console.log("active changed.")
    }, [active])

    const getPercentage = () => {
        let buys  = active.pairs[pairId].txns[time].buys;
        let sells = active.pairs[pairId].txns[time].sells;
        let total = buys + sells;

        if (buys === 0) {
            return 0;
        }
        
        return (buys / total) * 100;
    }

    if (!active) {
        return null;
    }

    return(
        <Layout title={active && active.title}>
            <PageNav/>
 
            <Container css={{ my: 100 }} gap={1.5} md>

                <Grid.Container alignItems="center" gap={1} css={{ mb: 40 }}>
                    <Grid css={{ mr: 20, textAlign: "left"}} xs={12} sm={1}>
                        <Avatar 
                            color="default"
                            squared
                            css={{ size: 80 }}
                            src={`/img/tokens/${active.symbol.toLowerCase()}.png`}/>
                    </Grid>
                    <Grid>
                        <div style={{ maxWidth: 700 }}>
                            <Text size={24} b>
                                {active.title}&nbsp;
                                <small style={{ fontSize: "1rem", color: "var(--nextui-colors-primary)" }}>
                                    {active.symbol}
                                </small>
                            </Text>
                        </div>
                        <div>
                            { active.pairs.length > 0 && 
                                <Text size={34} b css={{ lh: 1 }}>
                                    ${active.pairs[pairId].priceUsd}
                                
                                    <Badge size={"lg"}
                                        color={active.pairs[pairId].priceChange.h24 > 0 ? "success" : "error"}
                                        css={{ ml: 10 }}>
                                            {active.pairs[pairId].priceChange.h24 >= 0 && <>+</>}
                                        {active.pairs[pairId].priceChange.h24}%
                                    </Badge>
                                </Text>
                            }

                            { active.pairs.length == 0 && 
                                <Text size={34} b css={{ lh: 1 }}>
                                    ${price}
                                </Text>
                            }
                        </div>
                    </Grid>
                </Grid.Container>
                
                <Grid.Container gap={1.5} css={{ mt: 20 }} alignItems="stretch">
                    <Grid xs={12} sm={8}>
                        <div style={{ marginBottom: 40, width: "100%" }}>
                            <Text>
                                Contract:&nbsp;
                                <Link href={`https://bscscan.com/token/${active.contract}`}>
                                    <a target="_blank">
                                        {active.contract}
                                    </a>
                                </Link>
                            </Text>
                            <Text>
                                Holders: { txnData ? Functions.formatNumber(txnData.receiver_count)
                                    : "Loading..."}
                            </Text>
                            <Text>
                                Website: <Link href={active.website}>
                                    <a target="_blank">
                                        {active.website}
                                    </a>
                                </Link>
                            </Text>
                                    
                            <Grid.Container gap={0} css={{ mt: 40 }}>
                                <Grid xs={6} sm={3} css={{ mb: 40 }}>
                                    <div>
                                        <Text color="$gray800">Market Cap</Text>
                                        <Text size={20} b>
                                            ${active.pairs.length > 0
                                                ? Functions.shortenNumber(active.pairs[pairId].fdv)
                                                : Functions.shortenNumber(mcap)
                                            }
                                        </Text>
                                    </div>
                                </Grid>
                                <Grid xs={6} sm={3} css={{ mb: 40 }}>
                                    <div>
                                        <Text color="$gray800">Volume 24H</Text>
                                        <Text size={20} b>
                                            ${active.pairs.length > 0
                                                ? Functions.formatNumber(active.pairs[pairId].volume.h24, 2)
                                                : 0
                                            }
                                        </Text>
                                    </div>
                                </Grid>
                                <Grid xs={6} sm={3} css={{ mb: 40 }}>
                                    <div>
                                        <Text color="$gray800">Liquidity</Text>
                                        <Text size={20} b>
                                            ${active.pairs.length > 0
                                                ? Functions.shortenNumber(active.pairs[pairId].liquidity.usd)
                                                : Functions.shortenNumber(liquidity)
                                            }
                                        </Text>
                                    </div>
                                </Grid>
                                <Grid xs={6} sm={3} css={{ mb: 40 }}>
                                    <div>
                                        <Text color="$gray800">Circulating</Text>
                                        <Text size={20} b>
                                            {Functions.shortenNumber(circulating, 2)}
                                        </Text>
                                    </div>
                                </Grid>
                                <Grid xs={6} sm={3} css={{ mb: 40 }}>
                                    <div>
                                        <Text color="$gray800">Price Change (5M)</Text>
                                        { active.pairs.length > 0 ? 
                                        <Text size={20} b
                                            color={active.pairs[pairId].priceChange.m5 >= 0 ? "success" : "error"}>
                                            {active.pairs[pairId].priceChange.m5}%
                                        </Text> : <Text size={20} b>0%</Text> }
                                    </div>
                                </Grid>
                                <Grid xs={6} sm={3} css={{ mb: 40 }}>
                                    <div>
                                        <Text color="$gray800">Price Change (1H)</Text>
                                        { active.pairs.length > 0 ? 
                                        <Text size={20} b
                                            color={active.pairs[pairId].priceChange.h1 >= 0 ? "success" : "error"}>
                                            {active.pairs[pairId].priceChange.h1}%
                                        </Text> : <Text size={20} b>0%</Text> }
                                    </div>
                                </Grid>
                                <Grid xs={6} sm={3} css={{ mb: 40 }}>
                                    <div>
                                        <Text color="$gray800">Price Change (6H)</Text>
                                        { active.pairs.length > 0 ? 
                                        <Text size={20} b
                                            color={active.pairs[pairId].priceChange.h6 >= 0 ? "success" : "error"}>
                                            {active.pairs[pairId].priceChange.h6}%
                                        </Text> : <Text size={20} b>0%</Text> }
                                    </div>
                                </Grid>
                                <Grid xs={6} sm={3} css={{ mb: 40 }}>
                                    <div>
                                        <Text color="$gray800">Price Change (24H)</Text>
                                        { active.pairs.length > 0 ? 
                                        <Text size={20} b
                                            color={active.pairs[pairId].priceChange.h24 >= 0 ? "success" : "error"}>
                                            {active.pairs[pairId].priceChange.h24}%
                                        </Text> : <Text size={20} b>0%</Text> }
                                    </div>
                                </Grid>
                            </Grid.Container>

                            { active.pairs.length > 0 && 
                                <div style={{ marginTop: 30 }}>
                                    <Text size={14} css={{mb: 10}}>
                                        {active.pairs[pairId].txns[time].buys} buys /&nbsp;
                                        {active.pairs[pairId].txns[time].sells} sells
                                        ({Functions.formatNumber(parseFloat(getPercentage().toFixed(2)), 0)}% buys)
                                    </Text>
                                    <Progress
                                        color="primary"
                                        size="md"
                                        value={getPercentage()}
                                        css={{ mb: 10, maxWidth: 500 }}/>
                                </div>
                            }

                            { active.pairs.length == 0 && 
                                <div style={{ marginTop: 30 }}>
                                    <Text size={14} css={{mb: 10}}>
                                        0 buys / 0 sells
                                        (50% buys)
                                    </Text>
                                    <Progress
                                        color="primary"
                                        size="md"
                                        value={50}
                                        css={{ mb: 10, maxWidth: 500 }}/>
                                </div>
                            }
                        </div>
                    </Grid>

                    <Grid xs={12} sm={4}>
                        <TokenPairs/>
                    </Grid>

                    <Grid xs={12} sm={12}>
                        <TradingChart/>
                    </Grid>
                </Grid.Container>
            </Container>

            <Footer/>
        </Layout>
    )
}

export async function getServerSideProps(request) {
    const { symbol } = request.query;

    return {
        props: {
            symbol: symbol
        }
    }
}