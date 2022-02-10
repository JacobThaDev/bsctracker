import { Col, Container, Row } from "react-bootstrap";
import Footer from "../components/global/footer";

import PageNav from "../components/global/navigation";
import PageHeader from "../components/home/header/";
import HolderCount from "../components/home/stats/holders";
import Burned from "../components/home/stats/burned";
import Volume from "../components/home/stats/volume";
import Features from "../components/home/features";
import Hero from "../components/home/hero";
import { useEffect, useState } from "react";

import PageHead from "../components/global/head";
import axios from "axios";

import * as Functions from '../functions';

export default function Home({...props}) {

    const [data, setData]     = useState(null);

    useEffect(async() => {
        if (!props.token) {
            return;
        }

        updateStats(props.token);
        let selectBtn = document.getElementById("tokenSelect");

        selectBtn.addEventListener("change", () => {
            changeToken(selectBtn, props.token_list);
        });
    }, []);

    const updateStats = async(token) => {
        let price  = await Functions.getTokenPrice(token);
        let burned = await Functions.getBurned(token);
        let supply = await Functions.getTotalSupply(token);

        let circulating = supply - burned;
        let market_cap  = circulating * price;


        setData({
            price: price,
            burned: burned,
            supply: supply,
            circulating: circulating,
            market_cap: market_cap,
            holders: token.holders,
            transfers: token.transfers
        });
    }

    const changeToken = (select, tokens) => {
        setData(null);

        for (let token of tokens) {
            if (token.symbol.toLowerCase() == select.value.toLowerCase()) {
                console.log("Selected "+select.value);
                updateStats(token);
            }
        }
    }

    return (
        <>
            <PageHead/>
            <PageNav/>
            <PageHeader tokens={props.token_list}/>

            <section id="stats" style={{ marginTop: -40 }}>
                <Container>
                    <Row>
                        <Col xs={12} lg={4}>
                            <Volume data={data}/>
                        </Col>
                        <Col xs={12} lg={4}>
                            <Burned data={data}/>
                        </Col>
                        <Col xs={12} lg={4}>
                            <HolderCount data={data}/>
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



Home.getInitialProps = async({ query }) => {
    let api_url = process.env.NEXT_PUBLIC_API_URL;
    let tokens = await axios.get(api_url+"/tokens");

    let active_token = tokens.data[0]; // safemoon 

    return {
        token_list: tokens.data,
        token: active_token
    }
}