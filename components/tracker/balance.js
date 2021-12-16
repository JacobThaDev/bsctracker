import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, CardGroup } from 'react-bootstrap';

import * as Functions from '../../functions';

export default function BalanceCard() {
    
    let interval;
    let reflections  = 0;
    let lastBalance  = 0;
    let reflectStart = 0;
    let tickRate     = 10000;

    const [wallet, setWallet] = useState({
        balance: 0,
        reflections: 0,
        earned: 0,
        lastTick: 0,
        lastUpdate: null,
        price: 0,
        tokenData: null
    });

    const update = async(address) => {
        let balance   = await Functions.getBalance(address);
        let txnList   = await Functions.getTxns(address);
        let tokenData = await Functions.getTokenData();
        
        if (txnList.buys.length != 0) {
            let received = Functions.getTotal(txnList.buys);
            let sold     = 10 * Functions.getTotal(txnList.sells) / 9;
            reflections  = Math.abs(balance - (received - sold));

            if (reflectStart == 0) {
                reflectStart = reflections;
            }
        }

        if (lastBalance == 0) {
            lastBalance = balance;
        }

        let earned  = balance - lastBalance;
        lastBalance = balance;

        let today = new Date();

        setWallet({ 
            balance: balance,
            reflections: reflections,
            earned: reflections - reflectStart,
            lastTick: earned,
            lastUpdate: today.toLocaleTimeString(),
            tokenData: tokenData
        });
    }

    useEffect(() => {
        let address  = Cookies.get("wallet");
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

    let loadIcon = <i className="fal fa-spinner fa-pulse"></i>;

    return (<>
        <Row className="text-center align-items-center" xs={1} md={2} lg={3}>
            <Col>
                <Card className="shadow-sm mb-3">
                    <Card.Body>
                        <p className="small text-muted mb-0">
                            Balance:
                        </p>
                        <p className="mb-0">
                            { wallet.balance ? wallet.balance.toLocaleString(undefined, { 
                                minimumFractionDigits: 6
                            }) : loadIcon }
                        </p>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card className="shadow-sm mb-3">
                    <Card.Body>
                        <p className="small text-muted mb-0">
                            Earnings:
                        </p>
                        <p className="mb-0">
                            { wallet.reflections ? wallet.reflections.toLocaleString(undefined, { 
                                minimumFractionDigits: 6
                            }) : loadIcon }
                        </p>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card className="shadow-sm mb-3">
                    <Card.Body>
                        <p className="small text-muted mb-0">
                            Price (SFM/USD):
                        </p>
                        <p className="mb-0">
                            ${ wallet.tokenData ? wallet.tokenData.price.toLocaleString(undefined, { 
                                minimumFractionDigits: 6
                            }) : loadIcon }
                        </p>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card className="shadow-sm mb-3">
                    <Card.Body>
                        <p className="small text-muted mb-0">
                            Value (USD):
                        </p>
                        <p className="mb-0">
                            ${ wallet.tokenData && wallet.balance ? (wallet.balance * wallet.tokenData.price).toFixed(2) : loadIcon }
                        </p>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card className="shadow-sm mb-3">
                    <Card.Body>
                        <p className="small text-muted mb-0">
                            Earnings Value (USD):
                        </p>
                        <p className="mb-0">
                            ${ wallet.tokenData && wallet.reflections ? (wallet.reflections * wallet.tokenData.price).toFixed(2) : loadIcon }
                        </p>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card className="shadow-sm mb-3">
                    <Card.Body>
                        <p className="small text-muted mb-0">
                            Volume 24h (USD):
                        </p>
                        <p className="mb-0">
                            ${ wallet.tokenData ? wallet.tokenData.volume.toLocaleString() : loadIcon }
                        </p>
                    </Card.Body>
                </Card>
            </Col>
        </Row>

        <p className="small text-muted">
            All prices are approximate. Stats update every 10 seconds. Last Update: {wallet.lastUpdate}
        </p>
        </>
    );
    
}