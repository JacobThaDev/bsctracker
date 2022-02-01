import { Card, Col, Row, Container } from "react-bootstrap";

import PageHead from "../components/global/head";
import PageNav from "../components/global/navigation";
import Footer from "../components/global/footer";
import SmallHeader from "../components/global/small_header";

export default function Team() {

    return(
        <>
            <PageHead title="SafeMoon"/>
            <PageNav/>

            <SmallHeader title="Our Team" subtext="Meet our team here at BscTracker"/>
        

            <Container style={{paddingTop: 100, paddingBottom: 100}}>
                <Row className="align-items-center">
                    <Col xs={12} lg={3} className="mb-4 mb-lg-0">

                        <Card className="border-0 shadow-sm">
                            <Card.Body className="text-center py-5">
                                <img src="/img/avatar/fox.jpg" width={120}
                                    className="img-fluid rounded-circle mb-3"/>
                                <h5 className="mb-1">Jacob Smith</h5>
                                <p className="small-text">Senior Developer</p>

                                <div>
                                    <a href="https://twitter.com/OG_KingFox" 
                                            target="_blank"
                                            rel="nofollow noopener noreferrer"
                                            className="btn btn-primary btn-sm mx-1">
                                        <i className="fab fa-twitter fa-fw"/>
                                    </a>
                                    <a href="https://discord.com/users/150486701695827968" 
                                            target="_blank"
                                            rel="nofollow noopener noreferrer"
                                            className="btn btn-primary btn-sm mx-1">
                                        <i className="fab fa-discord fa-fw"/>
                                    </a>
                                    <a href="https://www.linkedin.com/in/jacob-smith-9a0462122/"  
                                            target="_blank"
                                            rel="nofollow noopener noreferrer"
                                            className="btn btn-primary btn-sm mx-1">
                                        <i className="fab fa-linkedin-in fa-fw"/>
                                    </a>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Footer/>
        </>
    )
}