import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';

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
        price: 0
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
            price: tokenData['priceUSD']
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
        <Row className="mb-2">
            <Col xs={12} lg={3}>
                <Card className="shadow-sm mb-3 mb-lg-0">
                    <Card.Body>
                        <p className="small text-muted mb-0">
                            Balance:
                        </p>
                        <p className="mb-0">
                            { wallet.balance ? wallet.balance.toLocaleString(undefined, { 
                                minimumFractionDigits: 9 
                            }) : loadIcon }
                        </p>
                    </Card.Body>
                    <Card.Footer className="small border-0 bg-transparent text-success pb-3">
                        +{wallet.earned.toFixed(9)} earned this session
                    </Card.Footer>
                </Card>
            </Col>
            <Col xs={12} lg={3}>
                <Card className="shadow-sm mb-3 mb-lg-0">
                    <Card.Body>
                        <p className="small text-muted mb-0">
                            Reflections:
                        </p>
                        <p className="mb-0">
                            { wallet.reflections ? wallet.reflections.toLocaleString(undefined, { 
                                minimumFractionDigits: 9 
                            }) : loadIcon }
                        </p>
                    </Card.Body>
                    <Card.Footer className="small border-0 bg-transparent text-success pb-3">
                        +{wallet.lastTick.toFixed(9)} earned on tick*
                    </Card.Footer>
                </Card>
            </Col>
            <Col xs={12} lg={3}>
                <Card className="shadow-sm mb-3 mb-lg-0">
                    <Card.Body>
                        <p className="small text-muted mb-0">
                            Price (SFM/BNB):
                        </p>
                        <p className="mb-0">
                            { wallet.price ? wallet.price.toLocaleString(undefined, { 
                                minimumFractionDigits: 9 
                            }) : loadIcon }
                        </p>
                    </Card.Body>
                    <Card.Footer className="small border-0 bg-transparent text-muted pb-3">
                       Price is approx.
                    </Card.Footer>
                </Card>
            </Col>
            <Col xs={12} lg={3}>
                <Card className="shadow-sm mb-3 mb-lg-0">
                    <Card.Body>
                        <p className="small text-muted mb-0">
                            Value (USD):
                        </p>
                        <p className="mb-0">
                            ${ wallet.price && wallet.balance ? (wallet.balance * wallet.price).toFixed(2) : loadIcon }
                        </p>
                    </Card.Body>
                    <Card.Footer className="small border-0 bg-transparent text-muted pb-3">
                       Value is approx.
                    </Card.Footer>
                </Card>
            </Col>
        </Row>

        <p className="small text-muted">
            *Each "tick" occurs every {tickRate/1000} seconds. Last Update: {wallet.lastUpdate}
        </p>
        </>
    );
    
}