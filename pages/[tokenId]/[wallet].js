import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import ErrorPage from 'next/error';

import PageHead from "../../components/global/head";
import TrackerHeader from "../../components/tracker/header";
import PageNav from "../../components/global/navigation";
import Footer from "../../components/global/footer";

import * as Functions from "../../functions";
import TxnList from "../../components/tracker/stats/txns";
import BalanceCard from "../../components/tracker/stats/balance";
import ReflectionCard from "../../components/tracker/stats/reflections";
import ValueCard from "../../components/tracker/stats/value";
import TrackerTokens from "../../components/tracker/stats/tokenList";

export default function Tracker() {

    const router                = useRouter();
    const tokens                = require("../../tokens");
    const keysList              = Object.keys(tokens);
    const tickRate              = 15000;
    const {tokenId, wallet}     = router.query;
    const [loading, setLoading] = useState(true);
    const [loaded, setLoaded]   = useState(false);

    const [data, setData] = useState({ 
        address: null,
        token: null,
        tokenStats: null,
        balance: 0,
        txnList: [],
        lastUpdate: -1
    });

    useEffect(async() => {
        if (!wallet || loaded) {
            return;
        }

        let interval;

        if (!interval) {
            update(wallet, tokenId);
            interval = setInterval(() => update(wallet), tickRate);
        }

        setLoaded(true);

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        }
    }, [wallet]);

    const update = async() => {
        try {
            let token      = await Functions.getTokenStats(tokenId);
            let balance    = await Functions.getBalance(token.contract, wallet);
            let txnList    = await Functions.getTxnList(tokens[tokenId].abbr, wallet);
            let today      = new Date();

            let dataArr = { 
                address: wallet,
                token: token,
                balance: balance,
                txnList: txnList.error ? [] : txnList.txns,
                lastUpdate: today.toLocaleTimeString()
            };

            setData(dataArr);
            setLoading(false);

            console.log("Data Updated!");
        } catch(err) {
            console.log("Update error", err);
        }
    }

    if (!wallet) 
        return null;
        
    if (!keysList.includes(tokenId)) 
        return <ErrorPage statusCode={404} />;

    let shortHand = wallet.substring(0, 2) + "..."
        + wallet.substring(wallet.length, wallet.length - 4)

    if (loading) {
        return (
            <>
                <PageHead title="0x...d753"/>
                <PageNav/>

                <TrackerHeader title={shortHand} token={tokens[tokenId]}/>

                <Container className="pb-5" style={{ marginTop: -25}}>
                    <Row className="mb-3">
                        <Col>
                            <Card>
                                <Card.Body>
                                    <i className="far fa-spinner fa-pulse me-3 text-success"></i>
                                    Loading Data...
                                </Card.Body>    
                            </Card>
                        </Col>
                    </Row>
                </Container>

                <Footer/>
            </>
        );
    }
    
    return(
        <>
            <PageHead title="0x...d753"/>
            <PageNav/>
            <TrackerHeader title={shortHand} token={tokens[tokenId]}/>
            <TrackerTokens address={wallet}/>

            <Container className="py-5" style={{ marginTop: -25}}>
                
                <Row className="flex-column-reverse flex-lg-row">
                    <Col xs={12} lg={4}>
                        <iframe className="shadow-sm rounded overflow-hidden"
                            height={700} 
                            width="100%" 
                            src={"https://dexscreener.com/bsc/"+tokens[tokenId].address+"?embed=1&theme=light&info=1"}/>
                    </Col>
                    <Col>
                        <Row>
                            <Col xs={12} lg={4}>
                                <BalanceCard 
                                    data={data} 
                                    token={tokenId} 
                                    loading={loading}/>
                            </Col>
                            <Col xs={12} lg={4}>
                                <ReflectionCard 
                                    data={data} 
                                    token={tokenId} 
                                    loading={loading}/>
                            </Col>
                            <Col xs={12} lg={4}>
                                <ValueCard 
                                    data={data} 
                                    token={tokenId} 
                                    loading={loading}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <TxnList 
                                    data={data} 
                                    token={tokenId} 
                                    loading={loading}/>
                            </Col>
                        </Row>

                        
                    </Col>
                </Row>      
            </Container>

            <Footer/>
        </>
    )
}