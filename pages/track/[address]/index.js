import Footer from "../../../components/global/Footer";
import PageNav from "../../../components/global/PageNav";
import Layout from "../../../components/Layout";
import { useEffect, useState } from "react";
import { useTracker } from "../../../context/tracker";
import { Container, Text, Grid, Badge, Divider, Card } from "@nextui-org/react";
import { useRouter } from "next/router";
import Functions from "../../../helpers/Functions";
import TokenList from "../../../components/tracker/TokenList";
import Token from "../../../helpers/Token";
import Wallet from "../../../helpers/Wallet";
import TokenTx from "../../../components/tracker/TokenTx";

export default function Portfolio({ address }) {

    const router = useRouter();

    const [ totalValue, setTotalValue ] = useState(0);
    const { tokens }                    = useTracker();
    const [ active, setActive ]         = useState(null);
    const [ updated, setUpdated ]       = useState(null);
    const [ wallets, setWallets ]       = useState(null);

    const changeToken = (key) => {
        let token;

        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].contract.toLowerCase() === key.currentKey.toLowerCase()) {
                token = tokens[i];
                break;
            }
        }

        if (token) {
            router.push("/track/"+address+"/"+token.symbol.toLowerCase());
            setActive(token);
        }
    }

    useEffect(() => {
        if (!tokens) {
            return;
        }

        setUpdated(Date.now());
        update();
    }, [tokens, address]);

    const update = () => {
        let balanceArr = [];
        let priceArr   = [];
        let tokenCopy  = tokens.map((x) => x);
        let total      = 0;

        for (let i = 0; i < tokenCopy.length; i++) {
            let token  = new Token(tokenCopy[i].contract, tokenCopy[i].primaryPool);
            let wallet = new Wallet(tokenCopy[i].contract, address);

            balanceArr.push(wallet.getBalance());
            priceArr.push(token.getPrice());
        }

        // don't ask...
        Promise.all(balanceArr).then((balances) => {
            Promise.all(priceArr).then(async(prices) => {

                for (let i = 0; i < balances.length; i++) {
                    let totalVal = parseFloat((balances[i] * prices[i]).toFixed(2));

                    tokenCopy[i].wallet = {
                        balance: balances[i],
                        price: prices[i],
                        total_value: Functions.formatNumber(totalVal, 2)
                    }

                    total += totalVal;
                }

                await tokenCopy.sort((a, b) => {
                    let first  = a.wallet.total_value;
                    let second = b.wallet.total_value;
                    return (second - first);
                });

                setWallets(tokenCopy);
                setTotalValue(total);
            });
        });
    }

    return(
        <Layout>
            <PageNav/>

            <Container css={{ my: 100 }} gap={1.5} md>
                <Grid.Container alignItems="center">
                    <Grid>
                        <Text color="$gray800">Portfolio</Text>
                        <Text css={{ mb: 20, fontWeight:"bold" }} size={24} >
                            {Functions.shortenAddress(address)}
                        </Text>
                    </Grid>
                </Grid.Container>
                
                <Grid.Container css={{ mt: 50 }} gap={1}>
                    <Grid xs={12} sm={7}>
                        <div style={{ width: "100%"}}>
                            <TokenList 
                                changeToken={changeToken}
                                wallets={wallets}/>
                        </div>
                    </Grid>
                    <Grid xs={12} sm={5}>
                        <div style={{ width: "100%"}}>
                            <Card variant="bordered" 
                                css={{ mb: 20, p: "1rem", bg: "transparent" }}>
                                <Card.Body>
                                    <Text color="$gray800">Total Value</Text>
                                    <Text size={30} b>
                                        ${Functions.formatNumber(totalValue, 2)}
                                    </Text>
                                </Card.Body>
                            </Card>
                            <TokenTx address={address}/>
                        </div>
                    </Grid>
                </Grid.Container>
            </Container>

            <Footer/>
        </Layout>
    )
}

export async function getServerSideProps( request ) {
    const { address } = request.params;

    return {
        props: {
            address: address
        }, // will be passed to the page component as props
    }
}