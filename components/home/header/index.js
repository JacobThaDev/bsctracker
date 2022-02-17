import { Card, Col, Container, Row } from "react-bootstrap";

import TokenIcons from "./token_icons";
import WalletForm from "./wallet_form";
import StarField from "../../starfield";
import FontIcon from "../../global/fonticon";
import { useEffect, useState } from "react";
import axios from "axios";

import * as Functions from '../../../functions';
import Marketcap from "../stats/volume";

export default function PageHeader() {

    const [tokenList, setTokenList] = useState(null);
    const [token, setToken]     = useState(null); 
    const [loaded, setLoaded]   = useState(false);

    const [price, setPrice] = useState(null);
    let loading = true;

    useEffect(async() => {
        let tokens = await axios.get("/api/tokens").then((res) => res.data);
        setTokenList(tokens);

        let current = await axios.get("/api/tokens/"+tokens[0].symbol).then((res) => res.data);
        setToken(current);

        let icons     = document.querySelectorAll(".tokenIcon");
        let selectBtn = document.getElementById("tokenSelect");
        
        if (!loaded) {
            icons.forEach((icon, index) => {
                icon.addEventListener("click", async function(event) {
                    event.preventDefault();

                    let symbol = icon.dataset.token;
                    selectBtn.value = symbol.toLowerCase();
                    selectBtn.dispatchEvent(new Event('change'));
                });
            });

            selectBtn.addEventListener("change", (event) => {
                changeToken(event.target.value);
            });
        }

        setLoaded(true);
    }, []);

    const changeToken = async(symbol) => {
        setLoaded(false);
        let token = await axios.get("/api/tokens/"+symbol).then((res) => res.data);

        if (token.error) {
            console.log(token.error);
            return;
        }

        setToken(token);
        setLoaded(true);
    }

    let loader = <FontIcon type="fad" icon="spinner" pulse={true} />

    return(
        <section className="home-header position-relative" id="test">
            <StarField/>

            <Container className="position-relative">
                <Row className="align-items-center">
                    <Col xs={12} className="pe-lg-5">

                        <h6 className="text-white-50">
                            <FontIcon type="fas" icon="rocket-launch"/> Welcome to
                        </h6>

                        <h1 className="display-4 text-white fw-bold mb-4">
                            A better way 
                            <div className="d-block text-white h1">
                                to track your DeFi Wallet.
                            </div>
                        </h1>

                        <p className="lead text-white-50">
                            Complete modern approach to aid your DeFi journey.
                        </p>

                        <div className="mt-5" style={{ maxWidth: 450 }}>
                            <WalletForm tokens={tokenList}/>
                        </div>

                        <TokenIcons tokens={tokenList}/>
                    </Col>
                </Row>
            </Container>

            <div className="token-stats">
                <Container>

                    <Row className="text-white justify-content-center justify-content-lg-between py-3 py-lg-4 text-center text-lg-start">
                        <Col xs={4} lg={2}>
                            <p className="small-text mb-0">Value</p>
                            <p className="h5 mb-2 mb-lg-0">
                                {!loaded ? loader : "$"+Functions.formatNumber(token.price, 9)}
                            </p>
                        </Col>
                        <Col xs={4}  lg={2}>
                            <p className="small-text mb-0">Market Cap</p>
                            <p className="h5 mb-0">
                                {!loaded ? loader : "$"+Functions.shortenNumber(token.marketcap, 2)}
                            </p>
                        </Col>
                        <Col xs={4}  lg={2}>
                            <p className="small-text mb-0">Holders</p>
                            <p className="h5 mb-0">
                                {!loaded ? loader : Functions.formatNumber(token.holders)}
                            </p>
                        </Col>
                        <Col xs={6}  lg={2}>
                            <p className="small-text mb-0">Burned</p>
                            <p className="h5 mb-0">
                                {!loaded ? loader : Functions.shortenNumber(token.burned, 2)}
                            </p>
                        </Col>
                        <Col xs={6}  lg={2}>
                            <p className="small-text mb-0">Circulating</p>
                            <p className="h5 mb-0">
                                {!loaded ? loader : Functions.shortenNumber(token.circulating, 2)}
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </section>
    )
}