import { useEffect, useState } from "react";

import Layout from "../components/global/layout";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import * as Functions from '../functions';
import FontIcon from "../components/global/fonticon";
import TxnList from "../components/tracker/transactions";
import V1Alert from "../components/tracker/warning";
import Copyright from "../components/global/copyright";

export default function Tracker({...props}) {

    const router  = useRouter();
    const {addr}  = router.query;

    let reflections    = 0,
        lastBalance    = 0,
        sessionEarned  = 0,
        reflectStart   = 0,
        tickRate       = 10000;

    const [loading, setLoading] = useState(true);

    const [wallet, setWallet]   = useState({ 
        balance: 0,
        reflections: 0,
        earned: 0,
        sessionEarned: 0,
        lastUpdate: 0,
        price: 0,
        volume: 0,
        transactions: null
    });

    useEffect(() => {
        let interval;

        if (addr) {
            update(addr);
            interval = setInterval(async() => update(addr), tickRate);
        }

        return() => {
            if (interval) {
                clearInterval(interval);
                interval = null;
            }
        };
    }, [addr]);

    const update = async(address) => {
        try {
            let balance   = await Functions.getBalance(address);
            let tokenData = await Functions.getTokenData();

            if (balance == 0) {
                setWallet({ 
                    balance: 0,
                    reflections: 0,
                    earned: 0,
                    sessionEarned: 0,
                    lastUpdate: 0,
                    price: tokenData.price,
                    volume: tokenData.volume,
                    transactions: []
                });
                setLoading(false);
                return;
            }

            let txnList   = await Functions.getTxns(address);
            
            
            if (txnList.buys.length != 0) {
                let received = Functions.getTotal(txnList.buys);
                let sold     = 10 * Functions.getTotal(txnList.sells) / 9;
                reflections  = Math.abs(balance - (received - sold));
            }

            if (reflectStart == 0)
                reflectStart = reflections;
            if (lastBalance == 0)
                lastBalance = balance;

            let earned  = balance - lastBalance;
            lastBalance = balance;

            let today = new Date();

            sessionEarned = (sessionEarned + earned);
            
            setWallet({ 
                balance: balance,
                reflections: reflections,
                earned: reflections - reflectStart,
                sessionEarned: sessionEarned,
                lastUpdate: today.toLocaleTimeString(),
                price: tokenData.price,
                volume: tokenData.volume,
                transactions: txnList.original
            });

            setLoading(false);
            console.log("update complete");
        } catch (err) {
            console.log(err);
        }
    }

    if (!addr) {
        return null;
    }

    let split     = addr.split("x");
    let shorthand = split[1].substring(split[1].length - 4, split[1].length);
    let loadIcon  = <i className="fal fa-spinner fa-pulse"></i>;

    return(
    <Layout title={"0x..."+shorthand} desc="The homepage for mah awesum app">
        <Container>
            <V1Alert address={addr}/>
            <Row>
                <Col>
                    <p>
                        <i className="fal fa-exclamation-circle me-2"></i>
                        You have earned <span className="text-success">
                        { wallet.sessionEarned.toLocaleString(undefined, { 
                            minimumFractionDigits: 9
                        }) }
                        </span> SFM this session.
                    </p>
                </Col>

                <Col className="text-end">
                    <p>
                        <FontIcon icon="wallet" /> 
                        0x...{shorthand}
                    </p>
                </Col>
            </Row>

            <Row>
                <Col xs={12} md={6} lg={4}>
                    <Card className="shadow-sm mb-3">
                        <Card.Body>
                            <p className="small text-muted mb-0">
                                Balance:
                            </p>
                            <p className="mb-0">
                                { Functions.formatNumber(wallet.balance, 6) }
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
                
                <Col xs={12} md={6} lg={4}>
                    <Card className="shadow-sm mb-3">
                        <Card.Body>
                            <p className="small text-muted mb-0">
                                Earnings:
                            </p>
                            <p className="mb-0">
                                { Functions.formatNumber(wallet.reflections, 6) }
                            </p>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} md={6} lg={4}>
                    <Card className="shadow-sm mb-3">
                        <Card.Body>
                            <p className="small text-muted mb-0">
                                Price (SFM/USD):
                            </p>
                            <p className="mb-0">
                                ${ Functions.formatNumber(wallet.price, 6) }
                            </p>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} md={6} lg={4}>
                    <Card className="shadow-sm mb-3">
                        <Card.Body>
                            <p className="small text-muted mb-0">
                                Value (USD):
                            </p>
                            <p className="mb-0">
                                ${ Functions.formatNumber(wallet.balance * wallet.price, 2) }
                            </p>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} md={6} lg={4}>
                    <Card className="shadow-sm mb-3">
                        <Card.Body>
                            <p className="small text-muted mb-0">
                                Earnings Value (USD):
                            </p>
                            <p className="mb-0">
                                ${ Functions.formatNumber(wallet.reflections * wallet.price, 2) }
                            </p>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} md={6} lg={4}>
                    <Card className="shadow-sm mb-3">
                        <Card.Body>
                            <p className="small text-muted mb-0">
                                Volume 24H (USD):
                            </p>
                            <p className="mb-0">
                                ${ Functions.formatNumber(wallet.volume, 0) }
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
            { !loading && wallet.transactions ? 
            <Row>
                <Col>
                    <TxnList txns={wallet.transactions} address={addr}/>
                </Col>
            </Row>
            : null }

            <Copyright/>

        </Container>
    </Layout>);
}