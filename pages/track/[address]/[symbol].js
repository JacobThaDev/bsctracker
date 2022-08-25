import {Card, Text} from "@nextui-org/react";
import {useEffect, useState} from "react";

import Footer from "../../../components/global/Footer";
import Navbar from "../../../components/global/Navbar";
import GridCol from "../../../components/grid/Column";
import GridContainer from "../../../components/grid/Container";
import GridRow from "../../../components/grid/Row";
import Layout from "../../../components/Layout";
import Wallet from "../../../helpers/Wallet";
import Token from "../../../helpers/Token";
import TokenInfo from "../../../components/tracker/token/info";
import Rewards from "../../../components/tracker/token/rewards";
import TxnList from "../../../components/tracker/token/txnlist";

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

            let price   = tokenData.getPrice();
            let balance = wallet.getBalance();

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
            <Navbar/>

            <div className="content">
                <GridContainer>
                    <GridRow>
                        <GridCol def={12}>
                            { token && <TokenInfo
                                token={token}
                                balance={balance}
                                price={price}
                                txnList={txnList}
                                address={address} /> }
                        </GridCol>
                    </GridRow>

                    <GridRow>
                        <GridCol xs={12} lg={4}>
                            <Rewards token={token} txnList={txnList} balance={balance}/>
                        </GridCol>
                        <GridCol xs={12} lg={8}>
                            { error &&
                                <Card variant={""} css={{ p: "1rem" }}>
                                    <Card.Body>
                                        {error}
                                    </Card.Body>
                                </Card>
                            }

                            { loading &&
                                <Card variant={""} css={{ p: "1rem" }}>
                                    <Card.Body>
                                        Fetching transactions...
                                    </Card.Body>
                                </Card>}
                            <TxnList token={token}
                                     txnList={txnList}
                                     address={address}/>
                        </GridCol>
                    </GridRow>

                    <Text size={12} color={"$gray600"} css={{ mt: 50 }}>
                        All values here are estimates.<br/>
                        This page is not intended to help you make financial decisions.
                    </Text>
                </GridContainer>
            </div>

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