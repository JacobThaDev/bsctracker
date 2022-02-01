import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Card, Container, Modal } from "react-bootstrap";
import Cookies from 'js-cookie';

export default function CookieNotice() {

    const router = useRouter();
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);


    const handleClose = () => {
        Cookies.set("hide-cn", true, { expires: 30, path: "/"});
        setShow(false);
    };

    useEffect(() => {
        let cookie = Cookies.get("hide-cn");

        if (!cookie) {
            if (router.asPath != "/legal" && !show) {
                setShow(true);
            }
        }
    }, []);
    
    return(
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
            <Modal.Header>
                <Modal.Title>
                    Cookies Notice
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    This website may use cookies to enhance your experience. <br/>
                    To find out more, read our <a href="/legal">cookies policy</a> and <a href="/legal">privacy policy</a> .
                </p> 

                <Button variant="link text-white bg-success rounded-pill px-4 me-3" 
                    onClick={handleClose}>
                    <i className="fal fa-check fa-fw me-3"></i>
                    Accept
                </Button>
                <a href="https://google.com" className="text-muted">
                    Cancel
                </a>
            </Modal.Body>
        </Modal>
    )
}