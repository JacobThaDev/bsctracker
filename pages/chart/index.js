import { useState } from "react";
import { Card, Container } from "react-bootstrap";

import PageHead from "../../components/global/head";
import PageNav from "../../components/global/navigation";
import ChartHeader from "../../components/chart/header";
import TokenList from "../../components/chart/tokenlist";
import Footer from "../../components/global/footer";

export default function Chart() {

    const charts = require("../../tokens.js");
    let token    = charts.sfm.address;

    return(
        <>
            <PageHead title="SafeMoon"/>
            <PageNav/>
            <ChartHeader token={charts.sfm} />
            <TokenList/>

            <Container className="my-4">
                <iframe 
                height={800} 
                width="100%" 
                src={"https://dexscreener.com/bsc/"+token+"?embed=1&theme=dark&info=1"}/>
            </Container>

            <Footer/>
        </>
    )
}