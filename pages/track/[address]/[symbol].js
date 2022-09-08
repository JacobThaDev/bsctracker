import { Card, Text, Grid, Container, Row, Col, Loading, Image, Button } from "@nextui-org/react";
import {useEffect, useState} from "react";
import Link from "next/link";

import Footer from "../../../components/global/Footer";
import PageNav from "../../../components/global/PageNav";
import Layout from "../../../components/Layout";
import Wallet from "../../../helpers/Wallet";
import Token from "../../../helpers/Token";
import Rewards from "../../../components/tracker/token/rewards";
import TxnList from "../../../components/tracker/token/txnlist";
import Functions from "../../../helpers/Functions";

const tokens = require("../../../tokens");

export default function PortfolioToken({ token, address }) {

    const [ balance, setBalance ]   = useState(0);
    const [ price, setPrice ]       = useState(0);
    const [ txnList, setTxnList ]   = useState(null);
    const [ error, setError ]       = useState(null);
    const [ loading, setLoading ]   = useState(false);

    useEffect(() => {
        async function update() {
            setLoading(true);
            setError(null);

            let wallet     = new Wallet(token.contract, address);
            let tokenData  = new Token(token.contract, token.primaryPool);

            let price      = tokenData.getPrice();
            let balance    = wallet.getBalance();

            Promise.all([ price, balance ]).then(async(res) => {
                setPrice(res[0]);
                setBalance(res[1]);

                try {
                    let txns = await wallet.getTransactions();

                    if (txns && Array.isArray(txns) && txns.length > 0) {
                        setTxnList(txns);
                    } else {
                        setError("Failed to fetch txns: "+txns+" (Try refreshing a bit slower.)");
                    }
                } catch(err) {

                }

                setLoading(false);
            });
        }

        update();
    }, []);

    return(
        <Layout>
            <PageNav/>

                <Container css={{ mt: 100 }} gap={2} md>
                    <Grid.Container alignItems="center" css={{ mb: 40 }}>
                        <Grid css={{ mr: 30 }}>
                            <Image src={`/img/tokens/${token.symbol.toLowerCase()}.png`}
                                 css={{ height: 80 }}/>
                        </Grid>
                        <Grid>
                            <div>
                                <Text size={24} b color="$gray700">
                                    {Functions.shortenAddress(address)}&nbsp;
                                    <small style={{ fontSize: "1rem", color: "var(--nextui-colors-primary)" }}>
                                        {token.symbol}
                                    </small>
                                </Text>
                            </div>
                            <div>
                                <Text size={34} b css={{ lh: 1 }}>
                                    {Functions.formatNumber(balance, 8)} 
                                </Text>
                            </div>
                        </Grid>
                        <Grid css={{ ml: "auto" }}>
                            <Link href={`/track/${address}`}>
                                <a>
                                    Back to Portfolio
                                </a>
                            </Link>
                        </Grid>
                    </Grid.Container>
                </Container>

                <Container css={{ mb: 100, mt: 30 }} gap={0} md>
                    <Grid.Container gap={4}>
                        <Grid xs={12} sm={7}>
                            <div style={{ width: "100%" }}>
                                <Text>
                                    Wallet:&nbsp;
                                    <Link href={`https://bscscan.com/address/${address}`}>
                                        <a target="_blank">
                                            {address}
                                        </a>
                                    </Link>
                                </Text>

                                <Text>
                                    Website:&nbsp;
                                    <Link href={token.website}>
                                        <a target="_blank">
                                            {token.website}
                                        </a>
                                    </Link>
                                </Text>

                                <Grid.Container css={{ mt: 30 }}>
                                    <Grid xs={6} sm={3}>
                                        <div>
                                            <Text color="$gray800">Price</Text>
                                            <Text size={20} b>
                                                ${Functions.shortenPrice(price)}
                                            </Text>
                                        </div>
                                    </Grid>
                                    <Grid xs={6} sm={3}>
                                        <div>
                                            <Text color="$gray800">Value</Text>
                                            <Text size={20} b>
                                                ${Functions.formatNumber(parseFloat((price * balance).toFixed(2)), 2)}
                                            </Text>
                                        </div>
                                    </Grid>
                                </Grid.Container>

                                {<Rewards token={token} txnList={txnList}/>}
                            </div>
                        </Grid>
                        <Grid xs={12} sm={5}>
                            <div style={{ width: "100%" }}>

                                { error && 
                                    <Text>{error}</Text>
                                }

                                {<TxnList 
                                    token={token} 
                                    address={address} 
                                    txnList={txnList}/>}
                            </div>
                        </Grid>
                    </Grid.Container>
                </Container>

                

            <Footer/>
        </Layout>
    )
}

export async function getServerSideProps( request ) {
    const {
        address, symbol
    } = request.params;

    let token;

    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].symbol.toLowerCase() === symbol.toLowerCase()) {
            token = tokens[i];
        }
    }

    return {
        props: {
            token: token,
            address: address
        }
    }
}