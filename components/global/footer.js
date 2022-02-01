import { Col, Row } from "react-bootstrap"
import CookieNotice from "./cookies"

export default function Footer() {

    return(
        <>
            <CookieNotice/>
            <footer className="footer bg-dark pt-5">
                <div className="container">
                    <Row className="row-grid align-items-center mb-5">
                        <Col className="col-lg-6">
                            <h3 className="text-primary font-weight-light mb-2">
                                Thank you for supporting us!
                            </h3>
                            <h4 className="mb-0 text-white-50">
                                Let's get in touch on any of these platforms.
                            </h4>
                        </Col>
            
                        <Col className="col-lg-6 btn-wrapper text-center text-lg-end mt-sm-4 mt-lg-0">
                            <a href="https://discord.gg/5BejZeDxWx" 
                                    className="px-3"
                                    target="_blank"
                                    rel="nofollow noopener noreferrer">
                                <i className="fab fa-discord fa-fw fa-2x"></i>
                            </a>
                            <a href="https://github.com/OGKingFox/sfmv2-tracker" 
                                    className="px-3"
                                    target="_blank"
                                    rel="nofollow noopener noreferrer">
                                <i className="fab fa-github fa-fw fa-2x"></i>
                            </a>
                            <a href="https://twitter.com/OG_KingFox"
                                    className="px-3"
                                    target="_blank"
                                    rel="nofollow noopener noreferrer">
                                <i className="fab fa-twitter fa-fw fa-2x"></i>
                            </a>
                            <a href="https://www.linkedin.com/in/jacob-smith-9a0462122/" 
                                    className="px-3"
                                    target="_blank"
                                    rel="nofollow noopener noreferrer">
                                <i className="fab fa-linkedin fa-fw fa-2x"></i>
                            </a>
                        </Col>
                    </Row>
            
                    <hr/>
            
                    <div className="row align-items-center justify-content-md-between pb-4 pt-2">
                        <div className="col-md-6">
                            <div className="copyright text-white-50">
                                Copyright &copy; 2021 <a href="/">BscTracker</a>. 
                                Created by <a href="https://twitter.com/OG_KingFox">OGKingFox</a>&nbsp;
                                with <i className="fas fa-heart text-danger"></i>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <ul className="nav nav-footer justify-content-end">
                                <li className="nav-item">
                                    <a href="/team" className="pe-2">
                                        Our Team
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/legal" className="px-2">
                                        Terms of Service
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/legal#privacy" className="px-2">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/legal#disclaimer" className="ps-2">
                                        Disclaimer
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}