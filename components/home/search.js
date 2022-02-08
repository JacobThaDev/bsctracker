import { useEffect, useState } from "react";
import { Button, Col, Container, Form, FormControl, FormGroup, InputGroup, Row } from "react-bootstrap";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

export default function Search({...props}) {

    const tokenList = require("../../tokens");

    useEffect(() => {
        if (!props.tokens) {
            return;
        }

        console.log("tokens", props.tokens);

        let form     = document.getElementById("searchForm");
        let field    = document.getElementById("walletAddr");
        let alert    = document.getElementById("walletAlert");
        let keys     = Object.keys(tokenList);

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

            if (!keys.includes(tokenid)) {
                console.log("Invalid token id", tokenid);
                return;
            }
            
            window.location = "/"+tokenid+"/"+wallet;
        });
    }, [props.tokens]);
    
    return(
        <Form id="searchForm">
            <div className="d-flex">
                <div className="custom-group">
                    <div className="walletAlert d-none" id="walletAlert">
                        <Tippy content="Invalid address format" placement="bottom">
                            <i className="far fa-exclamation-triangle text-danger"/>
                        </Tippy>
                    </div>
                    <FormControl 
                        name="wallet" 
                        id="walletAddr" 
                        placeholder="Type a wallet address and press enter"
                        className="ps-4"/>
                    <div className="gametype">
                        <Form.Select 
                                id="tokenSelect"
                                name="tokenId"
                                aria-label="Default select example" 
                                size="sm" 
                                className="border-0 token-select shadow-none">
                            <option value="sfm">SFM</option>
                            <option value="enh">ENH</option>
                            <option value="glow">GLOW</option>
                        </Form.Select>
                    </div>
                </div>
                <div>
                    
                </div>
            </div>
            yet
        </Form>
    );
}