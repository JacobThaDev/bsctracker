import { Fragment, useEffect } from "react";
import { Button } from "react-bootstrap";

import Web3 from "web3";
import Web3Modal from "web3modal";

export default function ConnectBtn({...props}) {

    useEffect(() => {
        const web3Modal = new Web3Modal({});
        const connect = document.getElementById("connect");

        connect.addEventListener("click", async function(e) {
            e.preventDefault();
            connect.classList.add("disabled");
            connect.innerHTML = "<i class=\"fal fa-spinner fa-pulse\"></i>";

            // ask for permission from MetaMask
            let provider = await web3Modal.connect();

            // if denied, remove disabled from button
            if (!provider) {
                console.log("Connect failed. Reason: denied access");
                return;
            }

            let web3     = new Web3(provider);
            let accounts = await web3.eth.getAccounts();
            let wallet   = accounts[0]; // grab first wallet address

            window.location = "/"+wallet;
        });
    }, []);

    return (
    <Fragment>
        <Button id="connect" className="border-0 ms-2">
            Connect Wallet
        </Button>
    </Fragment>);

}