import { useEffect, useState } from "react";
import { Card, Container, Grid, Text, useTheme } from '@nextui-org/react'
import PageHeader from '../../../components/global/header';
import Layout from "../../../components/global/layout";
import SearchBar from "../../../components/tracker/search";
import Wallet from "../../../helpers/Wallet";
import Functions from "../../../helpers/Functions";
import Binance from "../../../helpers/Binance";

const tokens = require("../../../tokens");

export default function TokenTracker({ symbol, address }) {

    const wbnb_address = "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c";
    const { type } = useTheme();

    const [balance, setBalance]     = useState(0);
    const [price, setPrice]         = useState(0);
    const [timer, setTimer]         = useState(null);
    const [bnb, setBnb]             = useState(0);
    const [liquidity, setLiquidity] = useState(0);

    useEffect(async() => {
        if (timer) {
            clearInterval(timer);
            setTimer(null);
        }

        await update();

        let interval = setInterval(async() => {
            await update();
        }, 5000);

        setTimer(interval);
    }, []);

    const update = async() => {
        let token       = tokens[symbol];
        let bnb_price   = await Binance.getBnbPrice();

        let user_wallet = new Wallet(token.contract, address);
        let lp_wbnb     = new Wallet(wbnb_address, token.primaryPool);
        let lp_tokens   = new Wallet(token.contract, token.primaryPool);

        let stats = await Promise.all([
            user_wallet.getBalance(), 
            lp_wbnb.getBalance(), 
            lp_tokens.getBalance()
        ]).then((values) => {
            let price = values[1] / values[2] * bnb_price;

            return {
                balance: values[0],
                wbnb: values[1],
                tokens: values[2],
                price: price
            };
        });

        let wbnb_value  = stats.wbnb * bnb_price;
        let token_value = stats.tokens * stats.price;

        setBnb(bnb_price);
        setBalance(stats.balance);
        setPrice(stats.price);
        setLiquidity(wbnb_value + token_value);
    }

    return (
        <Layout title="Tracker">
            <PageHeader 
            title={"Wallet Tracker"} 
            desc={symbol.toUpperCase()+" | "+Functions.shortenAddress(address)}/>
            <Container gap={2} css={{ mt:-35 }}>
                
                <Grid.Container gap={1}>
                    <Grid xs={12}>
                        <SearchBar 
                            defaultValue={address} 
                            activeToken={symbol}/>
                    </Grid>
                    <Grid xs={12} sm={4}>
                        <Card>
                            <Card.Header css={{ pl: 20 }}>
                                Balance
                            </Card.Header>
                            <Card.Body css={{ pt: 0 }}>
                                <Text size={20}>{Functions.formatNumber(balance.toFixed(12), 4)}</Text>
                            </Card.Body>
                        </Card>
                    </Grid>

                    <Grid xs={12} sm={4}>
                        <Card>
                            <Card.Header css={{ pl: 20 }}>
                                Value
                            </Card.Header>
                            <Card.Body css={{ pt: 0 }}>
                                <Text size={20}>
                                    ${Functions.formatNumber((balance * price).toFixed(2), 2)}
                                </Text>
                            </Card.Body>
                        </Card>
                    </Grid>

                    <Grid xs={12} sm={4}>
                        <Card>
                            <Card.Header css={{ pl: 20 }}>
                                Token Price
                            </Card.Header>
                            <Card.Body css={{ pt: 0 }}>
                                <Text size={20}>
                                    ${Functions.formatNumber(price.toFixed(12), 12)}
                                </Text>
                            </Card.Body>
                        </Card>
                    </Grid>

                    <Grid xs={12} sm={4}>
                        <Card>
                            <Card.Header css={{ pl: 20 }}>
                                BNB Price
                            </Card.Header>
                            <Card.Body css={{ pt: 0 }}>
                                <Text size={20}>
                                    ${Functions.formatNumber(bnb.toFixed(2))}
                                </Text>
                            </Card.Body>
                        </Card>
                    </Grid>

                    <Grid xs={12} sm={4}>
                        <Card>
                            <Card.Header css={{ pl: 20 }}>
                                Token Liquidity
                            </Card.Header>
                            <Card.Body css={{ pt: 0 }}>
                                <Text size={20}>
                                    ${Functions.formatNumber(liquidity.toFixed(2))}
                                </Text>
                            </Card.Body>
                        </Card>
                    </Grid>

                    <Grid xs={12}>
                        <Card>
                            <Card.Body css={{ p: 0 }}>
                                <iframe 
                                    frameBorder={0}
                                    width={"100%"}
                                    height={550}
                                    src={`https://dexscreener.com/bsc/${tokens[symbol].primaryPool}?embed=1&theme=${type}&trades=0&info=0`}>
                                </iframe>
                            </Card.Body>
                        </Card>
                    </Grid>
                </Grid.Container>
            </Container>
        </Layout>
    )
}

TokenTracker.getInitialProps = ({ query }) => {
    const { symbol, address } = query;

    return {
        symbol: symbol,
        address: address
    }
}