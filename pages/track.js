import React, { useEffect, Fragment, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Cookies from 'js-cookie';
import Userbar from '../components/header/userbar';
import BalanceCard from '../components/tracker/balance';
import PageHead from '../components/head';
import Transactions from '../components/tracker/transactions';
import Footer from '../components/global/footer';

import * as Functions from '../functions';
import ReflectionCard from '../components/tracker/earned';
import PriceCard from '../components/tracker/price';
import ValueCard from '../components/tracker/value';
import EarnedValueCard from '../components/tracker/earned_value';
import VolumeCard from '../components/tracker/volume';
import PriceChart from '../components/tracker/price_chart';

export default function WalletTracker({...props}) {

    let reflections    = 0;
    let lastBalance    = 0;
    let sessionEarned  = 0;
    let reflectStart   = 0;
    let tickRate       = 10000;

    const [wallet, setWallet] = useState({
        balance: 0,
        reflections: 0,
        earned: 0,
        sessionEarned: 0,
        lastUpdate: null,
        price: 0,
        volume: 0,
        transactions: null
    });

    const update = async(address) => {
        try {
            let balance   = await Functions.getBalance(address);
            let txnList   = await Functions.getTxns(address);
            let tokenData = await Functions.getTokenData();
            
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
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        let address  = Cookies.get("wallet");

        if (!address) {
            window.location = "/";
            return;
        }
        
        let interval;
        
        if (!interval) {
            update(address);
            interval = setInterval(async() => update(address), tickRate);
        }

        return() => {
            if (interval) {
                clearInterval(interval);
                interval = null;
            }
        };
    }, []);

    return(
        <Fragment>
            <PageHead title="Wallet Info" />
            <Userbar />

            <Container>
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
                </Row>

                <Row className="text-center align-items-center" xs={1} md={2} lg={3}>
                    <Col>
                        <BalanceCard 
                            balance={wallet.balance} />
                    </Col>
                    <Col>
                        <ReflectionCard 
                            reflections={wallet.reflections} />
                    </Col>
                    <Col>
                        <PriceCard 
                            price={wallet.price} />
                    </Col>
                    <Col>
                        <ValueCard 
                            price={wallet.price} 
                            balance={wallet.balance} />
                    </Col>
                    <Col>
                        <EarnedValueCard 
                            price={wallet.price} 
                            earned={wallet.reflections} />
                    </Col>
                    <Col>
                        <VolumeCard 
                            volume={wallet.volume} />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <PriceChart/>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Transactions 
                            txns={wallet.transactions} />
                    </Col>
                </Row>

                <Footer/>
            </Container>
        </Fragment>);
    

}