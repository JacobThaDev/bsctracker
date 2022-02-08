import axios from "axios";
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
        let token_abi;

        if (data.token.symbol == "ENH") {
            let token_abi = require("../../../abi/enh_dividends");
            let contract  = new web3.eth.Contract(token_abi, "0xd4a210030b71bb03fa85f8c72918078f1c185773");
            let dividends = await contract.methods.accumulativeDividendOf(data.address).call();
            setEarned(dividends / 10 ** 9);
            return;
        }
        
        if (data.token.symbol.toLowerCase() == "glow") {
            try {
                let api_url     = process.env.NEXT_PUBLIC_API_URL;
                let res         = await axios.get(api_url+"/txns/"+data.address);
                let txnList     = res.data.txns;
                let total       = 0;
                let distributor = "0x212f16eba125d60e40c45c28c831d9f8aa1917c0";

                if (txnList.length < 0 || txnList.error) {
                    return;
                }

                for (let txn of txnList) {
                    if (txn.from == distributor) {
                        total += txn.value;
                    }
                }

                setEarned(total);
            } catch(err) {
                console.log(err.message);
            }
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