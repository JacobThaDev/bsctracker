import { useEffect } from "react"
import { Card, Col, Container, Row } from "react-bootstrap";
import FontIcon from "../global/fonticon";

export default function Features() {

    useEffect(() => {

    }, []);

    return(
        <>
            <section style={{ marginTop: 100, marginBottom: 160}}>
                <Container>
                    <Row className="align-items-center text-center mb-5">
                        <Col xs={12}>
                            <h3 className="text-primary fw-bold">
                                About BscTracker
                            </h3>
                            <p>
                                BscTracker is an open-source portfolio tracker built on NextJS<br/> for the front-end, 
                                and NodeJS for everything else.
                            </p>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} lg={4}>
                            <div className="d-flex align-items-center mb-3 mb-lg-0">
                                <div className="me-3">
                                    <div className="icon icon-shape bg-primary text-white rounded-circle shadow">
                                        <FontIcon type="fal" icon="door-open" size="lg"/>
                                    </div>
                                </div>

                                <div>
                                    <h5 className="text-primary fw-bold">Open Source</h5>
                                    <p className="mb-0">Everything you see is completely free and open-sourced on GitHub, allowing for transparency and collaboration.</p>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} lg={4}>
                            <div className="d-flex align-items-center mb-3 mb-lg-0">
                                <div className="me-3">
                                    <div className="icon icon-shape bg-primary text-white rounded-circle shadow">
                                        <FontIcon type="fal" icon="chart-bar" size="lg"/>
                                    </div>
                                </div>

                                <div>
                                    <h5 className="text-primary fw-bold">Statistics</h5>
                                    <p className="mb-0">Get more advanced statistics on any given token including transfer counts, averages, senders, holders, and more!</p>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} lg={4}>
                            <div className="d-flex align-items-center mb-3 mb-lg-0">
                                <div className="me-3">
                                    <div className="icon icon-shape bg-primary text-white rounded-circle shadow">
                                        <FontIcon type="fal" icon="hand-holding-dollar" size="lg"/>
                                    </div>
                                </div>

                                <div>
                                    <h5 className="text-primary fw-bold">Reflection Tracking</h5>
                                    <p className="mb-0">Know exactly how much reflections you've received since you invested, and how much you're earning in real time!</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section style={{ marginTop: 100}} className="bg-alt py-5 position-relative">
                <Container>
                    <Row className="align-items-center chart-info">
                        <Col xs={12} lg={4}>
                            <h3 className="text-primary fw-bold">
                                TradingView Charts
                            </h3>
                            <p className="mb-4">
                                Detailed charts for all of the tokens listed, showing
                                you real-time prices
                            </p>

                            <a href="/chart" className="btn btn-outline-primary rounded-pill btn-lg">
                                View Charts
                            </a>
                        </Col>
                        <Col xs={12} lg={6} className="offset-lg-2 d-none d-lg-inline-block">
                            <Card 
                                className="mb-0 chart-img border-0 shadow bg-transparent" 
                                style={{ backgroundImage: 'url(/img/chart.png)'}}>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}