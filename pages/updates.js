import { Card, Col, Row, Container } from "react-bootstrap";

import PageHead from "../components/global/head";
import PageNav from "../components/global/navigation";
import Footer from "../components/global/footer";
import SmallHeader from "../components/global/small_header";
import Layout from "../components/layout";
import axios from "axios";

import * as Functions from '../functions';
import { useEffect, useState } from "react";

export default function Updates({...props}) {

    const [updates, setUpdates] = useState(null);

    useEffect(() => {
        if (props.updates) {
            let array = [];

            props.updates.forEach((log, index) => {
                let sha      = log.sha.substring(0, 7);
                let relative = Functions.getRelTime(log.commit.committer.date);
    
                array.push(
                    <Card className="border-0 shadow-sm mb-3" key={index}>
                        <Card.Body className="border-0 bg-transparent">
                            <div className="d-flex align-items-center">
                                <div>{log.commit.message}</div>
                                <div className="ms-auto">
                                    <a href={log.html_url} target="_blank" className="btn btn-link search-btn">
                                        {sha}
                                    </a>
                                </div>
                            </div>
                        </Card.Body>
    
                        <Card.Footer className="border-0 bg-transparent small text-muted">
                            <img src={log.committer.avatar_url} height={24} className="rounded-circle me-2"/> 
                            <a href={log.author.html_url} target="_blank" className="text-info me-1">{log.commit.committer.name}</a>
                            comitted {relative}
                        </Card.Footer>
                    </Card>
                )
            });

            setUpdates(array);
        }
    }, []);

    

    return(
        <Layout 
            title="Update Log"
            desc="Git commit history for BscTracker">
            <SmallHeader title="Update Log" subtext="Commit History from GitHub"/>
        

            <Container style={{paddingTop: 100, paddingBottom: 100}}>
                <Row className="align-items-center">
                    <Col xs={12} className="mb-4 mb-lg-0">

                        {updates}
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

Updates.getInitialProps = async({ query }) => {
    let api_url = "https://api.github.com/repos/ogkingfox/sfmv2-tracker/commits";
    let commits  = await axios.get(api_url);

    return {
        updates: commits.data
    }
}