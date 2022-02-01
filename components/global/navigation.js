import { Button, Container, Nav, Navbar } from "react-bootstrap";

export default function Navigation() {

    return(
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Container className="py-2">
                <Navbar.Brand>
                    <i className="fal fa-chart-bar fa-lg mt-2 me-3"></i> 
                    BscTracker
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/chart">Charts</Nav.Link>
                        
                    </Nav>
                    <Nav className="ms-auto">
                        <Button variant="primary rounded-pill px-4 kofi-btn py-2" 
                            target="_blank" rel="noopener nofollow noreferrer"
                        href="https://ko-fi.com/ogkingfox">
                            <i className="fat fa-coffee fa-fw me-3"></i>
                            Buy Me a Coffee
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}