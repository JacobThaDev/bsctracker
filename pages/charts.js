import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import PriceChart from '../components/tracker/price_chart';
import Layout from '../components/global/layout';

export default function Charts() {

    useEffect(() => {
        
    }, []);

    return (
    <Layout title="Charts">
        <Row>
            <Col>
                <PriceChart/>
            </Col>
        </Row>
    </Layout>);
}