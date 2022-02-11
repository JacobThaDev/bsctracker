import { Container, Row, Col } from "react-bootstrap";

export default function Hero() {

    return(
        <section className="discord-hero">
            <Container>
                <Row className="align-items-lg-center justify-content-lg-between py-5 py-lg-0">
                    <Col xs={12} lg={12}>
                        <div className="d-flex align-items-lg-center flex-column flex-lg-row">
                            <div className=" d-none d-lg-flex">
                                <img src="/img/wumpus.png" 
                                    width={300} 
                                    style={{ marginTop: -120}}/>
                            </div>
                            <div className="ps-0 ps-lg-3 w-100 text-white">
                                <h3 className="mb-0">Looking for a community?</h3>
                                <p className="mb-lg-0">Join our Discord!</p>
                            </div>
                            <div className="text-start text-lg-end text-nowrap">
                                <a href="https://discord.gg/5BejZeDxWx"
                                    target="_blank"
                                    rel="nofollow noopener noreferrer"
                                    className="btn btn-outline-light btn-lg w-100 rounded-pill px-4 pulse-primary">
                                        <i className="fab fa-discord me-3"></i>
                                        Join Discord
                                    </a>
                            </div>
                        </div>
                    </Col>
                </Row>
                
            </Container>
        </section>
    )
}