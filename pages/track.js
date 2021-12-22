import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import BalanceCard from '../components/tracker/balance';
import Transactions from '../components/tracker/transactions';

import * as Functions from '../functions';
import ReflectionCard from '../components/tracker/earned';
import PriceCard from '../components/tracker/price';
import ValueCard from '../components/tracker/value';
import EarnedValueCard from '../components/tracker/earned_value';
import VolumeCard from '../components/tracker/volume';
import PriceChart from '../components/tracker/price_chart';
import Layout from '../components/global/layout';
import Cookies from 'js-cookie';
import ValueChart from '../components/tracker/value_chart';

export default function WalletTracker() {

    let reflections    = 0,
        lastBalance    = 0,
        sessionEarned  = 0,
        reflectStart   = 0,
        tickRate       = 10000;

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
        let address = Cookies.get("wallet");
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

    return (
    <Layout title="Dashboard">
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
        
        <Row>
            <Col>
                <ValueChart
                    balance={wallet.balance}/>
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
    </Layout>);
}