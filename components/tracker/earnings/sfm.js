import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import FontIcon from "../../global/fonticon";
import * as Functions from "/functions";

const Web3  = require("web3");
const web3  = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org:443"));

export default function SafemoonEarnings({...props}) {

    const [earned, setEarned] = useState(0);
    const [loaded, setLoaded] = useState(false);

    useEffect(async() => {
        if (!props.data) {
            return;
        }

        let address = props.data.address;
        let token   = props.data.active;
        let txnlist = props.data.txnList;
        
        let bought    = 0;
        let sold      = 0;
        let reflected = 0;

        for (let txn of txnlist) {
            if (txn.contractAddress != token.contract) {
                continue;
            }

            let value  = txn.value / 10 ** 9;
            let isSell = txn.from.toLowerCase() === address.toLowerCase();

            if (isSell) {
                sold += value;
            } else {
                bought += value;
            }
        }

        reflected = Math.abs(props.data.balance - (bought - sold));
        setEarned(reflected);
        setLoaded(true);
    }, []);

    let icon = <FontIcon icon="spinner" type="fad" pulse={true}/>;

    return (
        <Card className="border-0 shadow-sm mb-3">
            <Card.Body>
                <p className="small-text text-muted mb-1">
                    Earnings (SFM)
                </p>
                <p className="mb-0 fw-bold">
                    {!loaded ? icon : earned} 
                </p>
            </Card.Body>
        </Card>
    )
}