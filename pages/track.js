import React, { useEffect, Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Cookies from 'js-cookie';
import Userbar from '../components/header/userbar';
import BalanceCard from '../components/tracker/balance';
import PageHead from '../components/head';
import Transactions from '../components/tracker/txns';
import Footer from '../components/global/footer';

import * as Functions from '../functions';

export default function WalletTracker({...props}) {

    useEffect(async() => {
        if (!Cookies.get("wallet")) {
            window.location = "/";
            return;
        }

    }, []);

    return(
        <Fragment>
            <PageHead title="Wallet Info" />
            <Userbar />

            <Container>
                <BalanceCard />
                <Transactions/>
                <Footer/>
            </Container>
        </Fragment>);
    

}