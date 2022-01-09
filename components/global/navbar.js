import React, { Component, Fragment } from 'react';

import FontIcon from './fonticon';
import { 
    Container, Nav, Navbar, NavbarBrand, NavbarLink, 
    NavDropdown, Form, FormControl, Button, InputGroup
} from 'react-bootstrap';

export default class MainNavbar extends Component {

    render() {
        return (
            <Fragment>
                <Navbar bg="default" variant="dark" expand="lg" className="mb-5">
                    <Container>
                        <Navbar.Brand href="#">
                            <div className="d-flex align-items-center">
                                <div>
                                    <FontIcon 
                                        icon="chart-bar" 
                                        size={"3x"} 
                                        type="duo" />
                                </div>
                                <div className="ps-3">
                                    <h5 className="mb-0">
                                        BscTracker <sup>v2</sup>
                                    </h5>
                                    <p className="mb-0 small">
                                        SafeMoon v2 Portfolio Tracker
                                    </p>
                                </div>
                            </div>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav className="ms-auto my-2 my-lg-0 me-lg-3">
                                <Nav.Link href="/">Home</Nav.Link>

                                <Nav.Link 
                                    href="https://safemoon.net" 
                                    target="_blank" 
                                    rel="nofollow noopener">
                                        SafeMoon
                                </Nav.Link>

                                <Nav.Link 
                                    href="https://safemoon.education" 
                                    target="_blank" 
                                    rel="nofollow noopener">
                                    Education
                                </Nav.Link>

                                <Nav.Link 
                                    href="https://bscscan.com/token/0x42981d0bfbaf196529376ee702f2a9eb9092fcb5" 
                                    target="_blank" 
                                    rel="nofollow noopener">
                                    BscScan
                                </Nav.Link>

                                {/*<NavDropdown title="Link" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action5">
                                        Something else here
                                    </NavDropdown.Item>
                                </NavDropdown>*/}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Fragment>
        );
    }
}