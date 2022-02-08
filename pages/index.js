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
import axios from "axios";

export default function Home() {

    const [loaded, setLoaded] = useState(false);
    const [tokens, setTokens] = useState(null);
    const [token, setToken]   = useState(null);

    useEffect(async() => {
        if (loaded) {
            return;
        }

        let api_url   = process.env.NEXT_PUBLIC_API_URL;
        let tokens    = await axios.get(api_url+"/tokens");

        setTokens(tokens.data);
        setToken(tokens.data[0]);

        let selectBtn = document.getElementById("tokenSelect");

        selectBtn.addEventListener("change", () => {
            changeToken(selectBtn, tokens.data);
        });
        setLoaded(true);
    }, []);

    const changeToken = (select, tokens) => {
        for (let token of tokens) {
            if (token.symbol.toLowerCase() == select.value.toLowerCase()) {
                console.log("Selected "+select.value);
                setToken(token);
            }
        }
    }

    return (
        <>
            <PageHead/>
            <PageNav/>
            <PageHeader tokens={tokens}/>

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