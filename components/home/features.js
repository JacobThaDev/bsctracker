import { useEffect } from "react"
import { Col, Container, Row } from "react-bootstrap";

export default function Features() {

    useEffect(() => {

    }, []);

    return(
        <Container style={{ marginTop: 100, marginBottom: 140}}>
            <Row className="align-items-center ">
                <Col xs={12} lg={6} className="mb-4 mb-lg-0">
                    <div className="mb-5">
                    <h3 className="text-primary">About BscTracker</h3>
                    <p>
                        BscTracker is an open-source portfolio tracker built on NextJS for the front-end, 
                        and NodeJS for everything else.
                    </p>
                    </div>

                    <div className="d-flex mb-3">
                        <div className="pe-4">
                            <i className="fat fa-door-open fa-3x text-primary fa-fw"></i>
                        </div>
                        <div>
                            <h5 className="text-primary">
                                Open Source
                            </h5>
                            <p>
                                Everything you see is completely free and open-sourced on GitHub,
                                allowing for transparency and collaboration.
                            </p>
                        </div>
                    </div>

                    <div className="d-flex mb-3">
                        <div className="pe-4">
                            <i className="fat fa-chart-bar fa-3x text-primary fa-fw"></i>
                        </div>
                        <div>
                            <h5 className="text-primary">
                                Statistics
                            </h5>
                            <p>
                                Get more advanced statistics on any given token including transfer 
                                counts, averages, senders, holders, and more!
                            </p>
                        </div>
                    </div>

                    <div className="d-flex">
                        <div className="pe-4">
                            <i className="fat fa-hand-holding-dollar fa-3x text-primary fa-fw"></i>
                        </div>
                        <div>
                            <h5 className="text-primary">
                                Reflection Tracking
                            </h5>
                            <p>
                                Know exactly how much reflections you've received since you invested,
                                and how much you're earning in real time!
                            </p>
                        </div>
                    </div>
                </Col>

                <Col className="text-center text-lg-end">
                    <img src="/img/crypto-portfolio-animate.svg" className="img-fluid"
                    style={{ maxWidth: 500}}/>
                </Col>
            </Row>
        </Container>
    )
}