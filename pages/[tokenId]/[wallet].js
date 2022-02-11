import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import ErrorPage from 'next/error';

import * as Functions from "../../functions";
import BalanceCard from "../../components/tracker/balance";
import TrackerTokens from "../../components/tracker/tokenList";
import EnhanceEarnings from "../../components/tracker/earnings/enh";
import SafemoonEarnings from "../../components/tracker/earnings/sfm";
import GlowEarnings from "../../components/tracker/earnings/glow";

import axios from "axios";
import Layout from "../../components/layout";
import ValueCard from "../../components/tracker/value";
import Transactions from "../../components/tracker/txns";
import EgcEarnings from "../../components/tracker/earnings/evergrow";
import WalletForm from "../../components/home/header/wallet_form";
import Cookies from "js-cookie";
import SearchForm from "../../components/tracker/search";

export default function Tracker({...props}) {

    const [timer, setTimer] = useState(null);
    const [data, setData] = useState(null);

    useEffect(async() => {
        if (!timer) {
            updateValue(props);
            let timer = setInterval(() => updateValue(props), 15000);
            setTimer(timer);
        }
    }, []);

    const updateValue = async(data) => {
        let address = data.token.contract;
        let price   = await Functions.getTokenPrice(data.token);
        let balance = await Functions.getBalance(address, data.address);
        let value   = parseFloat((balance * price).toFixed(2));

        try {
            let txndata = await axios.get("https://api.bscscan.com/api", {
                params: {
                    module: 'account',
                    action: 'tokentx',
                    address: data.address,
                    startblock: 0,
                    endblock: 99999999,
                    sort: 'desc',
                    apikey: process.env.NEXT_PUBLIC_BSCKEY
                }
            });

            let status  = parseInt(txndata.data.status);
            let txnlist = txndata.data.result;
            
            if (status == 1) {
                setData({
                    balance: balance,
                    value: value,
                    address: props.address,
                    token: props.token,
                    price: price,
                    txnList: txnlist
                });
            } else {
                setData({
                    balance: balance,
                    value: value,
                    address: props.address,
                    token: props.token,
                    price: price,
                    txnList: []
                });
            }
        } catch(err) {
            setData({
                balance: balance,
                value: value,
                address: props.address,
                token: props.token,
                price: price,
                txnList: []
            });
        }
    }

    let earned;

    if (props.token) {
        let symbol = props.token.symbol.toLowerCase();

        if (symbol == "enh") {
            earned = <EnhanceEarnings data={data}/>
        } else if (symbol == "sfm") {
            earned = <SafemoonEarnings data={data}/>
        } else if (symbol == "glow") {
            earned = <GlowEarnings data={data} />
        } else if (symbol == "egc") {
            earned = <EgcEarnings data={data} />
        }
    } else {
        return <ErrorPage statusCode={404}/>
    }

    let icon  = <i className="fad fa-spinner fa-pulse"></i>;
    let theme = Cookies.get("theme");

    return(
        <Layout title={Functions.shortenAddress(props.address)}>
            <div className="small-header">
                <Container>
                    <h2 className="text-white fw-bold mb-0">
                       {Functions.shortenAddress(props.address)}
                    </h2>
                    <p className="text-white-50">
                        Network: Bsc 
                        // Token: {props.token.symbol}
                    </p>
                </Container>
            </div>

            <Container style={{marginTop: -25}} className="w-100">
                <Card className="border-0 shadow-sm">
                    <Card.Body>
                        <div className="d-flex justify-content-between w-100 align-items-lg-center flex-column flex-lg-row">
                            <div className="mb-3 mb-lg-0">
                                <SearchForm
                                    active={props.token.symbol.toLowerCase()}
                                    tokens={props.tokens}
                                    default={props.address}/>
                            </div>
                            <div className="fw-bold">
                                Price: &nbsp;
                                {!data ? icon : 
                                    "$"+Functions.formatNumber(data.price, 12)
                                }
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Container>

            <Container className="py-5" style={{ marginTop: -25}}>
                <Row className="flex-column-reverse flex-lg-row">
                    
                    <Col xs={12} lg={4}>
                        <Card className="border-0 shadow-sm">
                        { props.token ? 
                            <iframe className="shadow-sm overflow-hidden"
                                height={700} 
                                width="100%" 
                                src={"https://dexscreener.com/bsc/"+props.token.contract+"?embed=1&theme="+theme+"&info=1"}/>
                        : "" }
                        </Card>
                    </Col>
                    <Col>
                        <Row>
                            <Col xs={12} lg={4}>
                                <BalanceCard data={data}/>
                            </Col>
                            <Col xs={12} lg={4}>
                                {earned}
                            </Col>
                            <Col xs={12} lg={4}>
                                <ValueCard data={data}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Transactions data={data}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                
            </Container>
        </Layout>
    )
}

Tracker.getInitialProps = async({ query }) => {
    const { tokenId, wallet } = query;

    let api_url = process.env.NEXT_PUBLIC_API_URL;
    let tokens = await axios.get(api_url+"/tokens");

    let active_token;

    for (let token of tokens.data) {
        if (token.symbol.toLowerCase() == tokenId.toLowerCase()) {
            active_token = token;
            break;
        }
    }

    return {
        tokens: tokens.data,
        address: wallet,
        token: active_token,
        balance: 0,
        price: 0,
        txnList: [],
        lastUpdate: -1
    }
}