import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import FontIcon from "../../global/fonticon";
import * as Functions from "/functions";

const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org:443"));

export default function EnhanceEarnings({...props}) {

    const [earned, setEarned] = useState(0);
    const [loaded, setLoaded] = useState(false);

    useEffect(async() => {
        if (!props.data) {
            return;
        }

        let data = props.data;
        let token_abi = require("/abi/enh_dividends");
        let contract  = new web3.eth.Contract(token_abi, "0xd4a210030b71bb03fa85f8c72918078f1c185773");
        let dividends = await contract.methods.accumulativeDividendOf(data.address).call();
        setEarned(dividends / 10 ** 9);
        setLoaded(true);
    }, [props.data]);

    let icon = <FontIcon icon="spinner" type="fad" pulse={true}/>;

    return (
        <Card className="border-0 shadow-sm mb-3">
            <Card.Body>
                <p className="small-text text-muted mb-1">
                    Earnings (SFM)
                </p>
                <p className="mb-0 fw-bold">
                    {!loaded ? icon : Functions.formatNumber(earned, 5)} 
                </p>
            </Card.Body>
        </Card>
    )
}