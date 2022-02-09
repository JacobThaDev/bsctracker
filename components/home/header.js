import { useEffect, useState } from "react";
import { Col, Container, Form, FormControl, Row } from "react-bootstrap";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

export default function PageHeader({...props}) {

    const [options, setOptions] = useState(null);

    useEffect(() => {
        if (!props.tokens) {
            return;
        }

        let opts = [];
        props.tokens.forEach((token) => {
            opts.push(
                <option value={token.symbol.toLowerCase()}>
                    {token.symbol}
                </option>
            );
        });
        setOptions(opts);

        let form     = document.getElementById("searchForm");
        let field    = document.getElementById("walletAddr");
        let alert    = document.getElementById("walletAlert");

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            let data = new FormData(form);

            let tokenid = data.get("tokenId");
            let wallet  = data.get("wallet");
            let parts   = wallet.split("x");

            if (parts.length != 2 
                || parts[0] != "0" 
                || parts[1].length != "40") {
                    alert.classList.remove("d-none");
                return;
            }

            alert.classList.add("d-none");
            field.disabled = true;

            let found = false;

            for (let token of props.tokens) {
                if (token.symbol.toLowerCase() == tokenid.toLowerCase()) {
                    found = true;
                    break;
                }
            }

            if (!found) {
                field.disabled = false;
                return;
            }
            
            window.location = "/"+tokenid+"/"+wallet;
            field.disabled = false;
        });
    }, [props.tokens]);

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
                            <Form id="searchForm">
                                <div className="d-flex">
                                    <div className="w-100">
                                        <div className="custom-group">
                                            <div className="walletAlert d-none" id="walletAlert">
                                                <Tippy content="Invalid address format" placement="bottom">
                                                    <i className="far fa-exclamation-triangle text-danger"/>
                                                </Tippy>
                                            </div>
                                            <FormControl 
                                                name="wallet" 
                                                id="walletAddr" 
                                                placeholder="Type a wallet address"
                                                className="ps-4"/>
                                            <div className="gametype">
                                                <Form.Select 
                                                        id="tokenSelect"
                                                        name="tokenId"
                                                        aria-label="Default select example" 
                                                        size="sm" 
                                                        className="border-0 token-select shadow-none">
                                                    {options}
                                                </Form.Select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-nowrap ps-2">
                                        <button type="submit" className="btn btn-primary shadow-0">
                                            Go <i className="fat fa-arrow-right fa-fw"></i>
                                        </button>
                                    </div>
                                </div>
                                
                            </Form>
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
                                <div className="me-2">
                                    <img alt="Glow v2" 
                                        src="/img/glowv2.png" 
                                        style={{ height: 40 }} 
                                        data-toggle="tooltip" 
                                        data-placement="bottom" 
                                        title="Glow v2"/>
                                </div>
                            </div>
                        </div>

                    </Col>
                </Row>
            </Container>
        </section>
    )
}