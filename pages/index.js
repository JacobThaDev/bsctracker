import React, { useEffect, useState } from 'react';
import { Card, Button, Col, Row, Form, FormGroup, FormControl } from 'react-bootstrap';

import PageHead from '../components/head';
import Footer from '../components/global/footer';

import Web3 from "web3";
import Web3Modal from "web3modal";
import Cookies from 'js-cookie';

export default function Homepage() {

    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const web3Modal = new Web3Modal({});
        let connect = document.getElementById("connect");
        let manual  = document.getElementById("manual");
        
        manual.addEventListener("click", async function(e) {
            e.preventDefault();
            setShowForm(true);
        });

        connect.addEventListener("click", async function(e) {
            e.preventDefault();
            connect.classList.add("disabled");
            connect.innerHTML = "<i class=\"fal fa-spinner fa-pulse\"></i>";

            // ask for permission from MetaMask
            const provider = await web3Modal.connect();

            // if denied, remove disabled from button
            if (!provider) {
                console.log("Connect failed. Reason: denied access");
                return;
            }

            const web3     = new Web3(provider);
            const accounts = await web3.eth.getAccounts();
            const wallet   = accounts[0]; // grab first wallet address

            Cookies.set("wallet", wallet, { expires: 30 });
            window.location = "/track";
        });
    }, []);

    const submitForm = (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        let address  = formData.get("address");
        let parts    = address.split("x");
        let field    = document.getElementById("address");

        field.classList.remove("border-danger");

        if (parts.length != 2 
                || parts[0] !== '0' 
                || parts[1].length < 40 
                || !/^([A-Za-z0-9]+)+$/.test(parts[1])) {
            field.classList.add("border-danger");
        }

        Cookies.set("wallet", address, { expires: 7 });
        window.location = "/track";
    };

    return (<>
        <PageHead title="Home" />

        <div className="d-flex align-items-center login-box flex-column">
            <div className="login-box-inner">
                <Card className="text-center mb-3">
                    <Card.Body>
                        <h1><i className="fal fa-user-chart"></i></h1>
                        <h4>Wallet Tracker</h4>

                        <p className="small text-muted">
                            Connect your wallet to track your balance and 
                            reflections for SafeMoon v2
                        </p>
                        {showForm ? 
                            <Form autoComplete='off' id="address_form" onSubmit={submitForm}>
                                <FormGroup className="mb-3 text-start">
                                    <small className="text-muted">
                                        Address
                                    </small>
                                    <FormControl name="address" id="address"/>
                                </FormGroup>
                                <FormGroup>
                                    <Button type="submit" className="btn btn-success w-100">
                                        Continue
                                    </Button>
                                </FormGroup>
                            </Form>
                        : 
                        <div className="d-flex align-items-center">
                            <div className="w-100">
                                <Button id="connect" variant="primary w-100">
                                    Connect Wallet
                                </Button>
                            </div>
                            <div style={{ minWidth: 75}} className="text-muted">
                                - or -
                            </div>
                            <div className="w-100">
                                <Button id="manual" variant="dark w-100">
                                    Enter Address
                                </Button>
                            </div>
                        </div>
                        }
                    </Card.Body>
                </Card>

                <Footer/>
            </div>
        </div>
        
    </>);
    

}