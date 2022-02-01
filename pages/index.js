import { Col, Container, Row } from "react-bootstrap";
import Footer from "../components/global/footer";

import PageNav from "../components/global/navigation";
import PageHeader from "../components/home/header";
import HolderCount from "../components/home/stats/holders";
import Burned from "../components/home/stats/burned";
import Volume from "../components/home/stats/volume";
import Features from "../components/home/features";
import Hero from "../components/home/hero";
import { useEffect, useState } from "react";

import PageHead from "../components/global/head";

export default function Home() {

    const tokens = require("../tokens");

    const [token, setToken] = useState({
        title: 'SafeMoon', 
        abbr: 'sfm', 
        address: '0x42981d0bfbaf196529376ee702f2a9eb9092fcb5', 
        supply: 1000000000000, 
        burn_wallet: '0x0000000000000000000000000000000000000001'
    });

    useEffect(() => {
        let selectBtn = document.getElementById("tokenSelect");

        selectBtn.addEventListener("change", () => {
            changeToken(selectBtn);
        });
    }, []);

    const changeToken = (select) => {
        let keys = Object.keys(tokens);

        if (!keys.includes(select.value)) {
            return;
        }

        let token = tokens[select.value];

        setToken({
            title: token.title,
            abbr: token.abbr,
            address: token.address,
            supply: token.supply,
            burn_wallet: token.burn_wallet
        });
    }

    return (
        <>
            <PageHead/>
            <PageNav/>
            <PageHeader/>

            <section id="stats" style={{ marginTop: -40 }}>
                <Container>
                    <Row>
                        <Col xs={12} lg={4}>
                            <Volume token={token}/>
                        </Col>
                        <Col xs={12} lg={4}>
                            <Burned token={token}/>
                        </Col>
                        <Col xs={12} lg={4}>
                            <HolderCount token={token}/>
                        </Col>
                    </Row>
                </Container>
            </section>

            <Features/>
            <Hero/>
            <Footer/>
        </>
    );
}