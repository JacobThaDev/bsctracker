import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import * as Functions from '../functions';
import Layout from '../components/global/layout';
import Cookies from 'js-cookie';
import Transactions from '../components/tracker/transactions';

export default function Txns() {

    const [ txns, setTxns ] = useState(null);

    useEffect(async() => {
        let address   = Cookies.get("wallet");
        let txnList   = await Functions.getTxns(address);

        setTxns(txnList);
    }, []);

    if (!txns) {
        return null;
    }

    return (
    <Layout title="Transactions">
        <Row>
            <Col>
               <Transactions txns={txns.original}/>
            </Col>
        </Row>
    </Layout>);
}