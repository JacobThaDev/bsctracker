import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Card, Col, Container, Row, Tab, Tabs } from "react-bootstrap";

import BalanceCard from "../../components/tracker/balance";
import axios from "axios";
import Layout from "../../components/layout";
import ValueCard from "../../components/tracker/value";
import Transactions from "../../components/tracker/txns";
import SearchForm from "../../components/tracker/search";
import TokenInfo from "../../components/tracker/info";
import * as Functions from "../../functions";
import Loader from "../../components/loader";
import FontIcon from "../../components/global/fonticon";
import ErrorPage from "../../components/error";

export default function Tracker({...props}) {

    const [loaded, setLoaded]     = useState(false);
    const [error, setError]       = useState(null);
    const [Earnings, setEarnings] = useState(null);

    const [data, setData] = useState({
        tokens: null,
        address: props.address,
        active: null,
        balance: 0,
        price: 0,
        txnList: [],
        lastUpdate: -1
    });

    useEffect(async() => {
        if (!props || !props.address) {
            return;
        }

        let interval;

        try {
            let tokens = await axios.get("/api/tokens").then((res) => res.data);
            let active;

            for (let token of tokens) {
                if (token.symbol.toLowerCase() == props.tokenId.toLowerCase()) {
                    active = token;
                    break;
                }
            }

            let data = await getData(tokens, active);
            
            if (!interval) {
                setInterval(async() => {
                    let data = await getData(tokens, active);
                    setData(data);
                }, 15000);
            }

            let symbol   = data.active.symbol.toLowerCase();
            let Earnings = dynamic(() => import("../../components/tracker/earnings/" + symbol + ".js"), { ssr: false });
            
            setData(data);
            setEarnings(Earnings);
        } catch(err) {
            console.error(err);
        }

        setLoaded(true);

        return () => {
            if (interval)
                clearInterval(interval);
        }
    }, []);

    const getData = async(tokens, active) => {
        let price   = await Functions.getTokenPrice(active);
        let balance = await Functions.getBalance(active.contract, props.address);
        let value   = parseFloat((balance * price).toFixed(2));
        let txns    = await axios.get("/api/txns/"+props.address);

        return {
            tokens: tokens,
            address: props.address,
            active: active,
            value: value,
            balance: balance,
            price: price,
            txnList: txns.data,
            lastUpdate: Date.now()
        };
    }
    
    if (!loaded || !data.active) {
        return (<Loader/>);
    }

    if (error) {
        return (<Error message={error}/>);
    }

    let icon = <FontIcon icon="spinner" type="fad" pulse={true}/>;

    try {
        return(
            <Layout title={Functions.shortenAddress(props.address)}>
                <div className="small-header">
                    <Container>
                        <div className="d-flex align-items-lg-center flex-column flex-lg-row">
                            <div>
                                <h2 className="text-white fw-bold mb-0">
                                    {Functions.shortenAddress(props.address)}
                                </h2>
                                <p className="text-white-50">
                                    Network: Bsc 
                                    // Token: {props.tokenId.toUpperCase()}
                                </p>
                            </div>
                            <div className="ms-lg-auto">
                                <SearchForm
                                    active={props.tokenId.toLowerCase()}
                                    tokens={data.tokens}
                                    default={data.address}/>
                            </div>
                        </div>
                    </Container>
                </div>

                <Container style={{marginTop: -25}} className="w-100">
                    <Card className="border-0 shadow-sm">
                        <Card.Body>
                            <div className="d-flex justify-content-between w-100 align-items-lg-center flex-column flex-lg-row">
                                <div className="fw-bold">
                                    Price (USD): &nbsp;
                                    {!data ? icon : 
                                        "$"+Functions.formatNumber(data.price, 12)
                                    }
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>

                <Container className="py-5" style={{ marginTop: -25}}>
                    <Row className="flex-column flex-lg-row">
                        <Col xs={12} lg={4}>
                            <BalanceCard data={data}/>
                            {Earnings ? <Earnings data={data}/> : ""}
                            <ValueCard data={data}/>

                            <Card className="mb-3 border-0 shadow-sm">
                                <Card.Body>
                                    <a href={"/nfts/"+props.address} 
                                        target="_blank" className="btn btn-link search-btn ps-0 py-0">
                                        View NFT Collection 
                                        <FontIcon type="fal" icon="arrow-right" className="ms-2"/>
                                    </a>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Row>
                                <Col>
                                    <Card className="border-0 shadow-sm mb-3">
                                        <TokenInfo token={data.active} />
                                    </Card>

                                    <Card className="border-0 shadow-sm mb-3">
                                        <Card.Header className="bg-transparent py-3">
                                            Transaction History
                                        </Card.Header>
                                        <Transactions data={data}/>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    
                </Container>
            </Layout>
        )
    } catch(err) {
        console.log(err);
        return (<ErrorPage message={err.message}/>)
    }
}

Tracker.getInitialProps = async({ query }) => {
    const { tokenId, wallet } = query;

    return {
        tokenId: tokenId,
        address: wallet
    }
}