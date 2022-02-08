import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

import * as Functions from "../../../functions";
import LoadingCard from "./loading";

const Web3  = require("web3");
const web3  = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org:443"));


export default function ReflectionCard({...props}) {

    const [earned, setEarned] = useState(0);

    useEffect(async() => {
        let data = props.data;

        if (data.token.symbol == "ENH") {
            let glow_abi = require("../../../abi/enh_dividends");
            let contract = new web3.eth.Contract(dividends_abi, data.token.contract);
            let balance  = await contract.methods.accumulativeDividendOf(data.address).call();
            let decimals = 9;
            setEarned(balance / 10 ** decimals);
            return;
        }

        if (data.token.symbol == "GLOW") {
            let glow_abi = require("../../../abi/glow");
            let contract = new web3.eth.Contract(glow_abi, data.token.contract);
            let balance  = await contract.methods.showMyDividendRewards(data.address).call();
            let decimals = 18;
            setEarned(balance / 10 ** decimals);
            return;
        }

        let txnList = props.data.txnList;
        
        if (txnList.error || txnList.length < 1) {
            console.log("no transactions.");
            return;
        }

        let balance   = await Functions.getBalance(data.token.contract, data.address);
       
        let bought    = 0;
        let sold      = 0;
        let reflected = 0;
        
        txnList.forEach((txn) => {
            if (txn.direction == "in")
                bought += txn.value;
            if (txn.direction == "out")
                sold += txn.value;
        });

        reflected = Math.abs(balance - (bought - sold));
        setEarned(reflected);
    }, [props.data]);

    return (
        <Card className="border-0 shadow-sm mb-3">
            <Card.Body>
                <p className="small-text text-muted mb-1">
                    Earnings ({props.data.token.rewards.toUpperCase()})
                </p>
                <p className="mb-0 fw-bold">
                    {Functions.formatNumber(earned, 5)} 
                </p>
            </Card.Body>
        </Card>
    )
}