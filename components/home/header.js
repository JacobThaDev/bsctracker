import { Col, Container, Row } from "react-bootstrap";
import Search from "./search";

export default function PageHeader() {

    return(
        <section className="bg-dark pt-5" id="test">
            <Container className="position-relative pt-5 pb-6">
                <Row className="align-items-center">
                    <Col xs={12} className="pe-lg-5">

                        <h6 className="text-white">
                            - Welcome to
                        </h6>

                        <h1 className="display-4 text-white fw-bold mb-4">
                            A better way 
                            <strong className="d-block text-primary fw-bold h1">
                                to track your DeFi Wallet.
                            </strong>
                        </h1>

                        <p className="lead text-white opacity-8">
                            Complete modern approach to aid your DeFi journey.
                        </p>

                        <div className="mt-5" style={{ maxWidth: 450 }}>
                            <Search className="text-white-50"/>
                        </div>

                        <div className="mt-5 mt-lg-5 mt-xl-7">
                            <h6 className="text-sm text-white opacity-7 mb-3">
                                Compatible with:
                            </h6>
                            <div className="d-flex">
                                <div className="me-2">
                                    <img alt="SafeMoon v2"
                                        src="https://safemoon.net/img/logo.svg" 
                                        style={{ height: 40 }} 
                                        data-toggle="tooltip" 
                                        data-placement="bottom" 
                                        title="SafeMoon v2"/>
                                </div>
                                <div className="me-2">
                                    <img alt="Enhance" 
                                        src="/img/enhance.png" 
                                        style={{ height: 40 }} 
                                        data-toggle="tooltip" 
                                        data-placement="bottom" 
                                        title="SafeMoon v2"/>
                                </div>
                            </div>
                        </div>

                    </Col>
                </Row>
            </Container>
        </section>
    )
}