import { useRouter } from "next/router";
import { useEffect } from "react";
import { Card, Row, Col, Container, Form, FormGroup, FormControl, Button, InputGroup } from "react-bootstrap";
import FontIcon from "../global/fonticon";
import ConnectBtn from "./connect";

export default function SearchBar() {

    const router = useRouter();

    useEffect(() => {
        let form = document.getElementById("walletForm");

        if (form) {
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                let formData = new FormData(form);
                let address  = formData.get("address");

                router.push("/"+address);
                console.log(address);
            })
        }

    }, [null]);

    return(
    <Card className="border-0 shadow mb-3">
        <Card.Body>
            <Form className="form-inline" type="post" autoComplete="off" id="walletForm">
                <div className="d-flex justify-content-between">
                    <div>
                        <InputGroup>
                            <FormControl 
                                name="address" 
                                placeholder="Wallet Address" 
                                id="address" />
                            <Button type="submit" variant="light bg-white border-0">
                                <FontIcon icon="search" />
                            </Button>
                        </InputGroup>
                    </div>
                    <div>
                        <ConnectBtn />
                    </div>
                </div>
                
                
            </Form>
        </Card.Body>
    </Card>);
}