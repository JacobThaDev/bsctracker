import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

import * as Functions from "../../../functions";
import LoadingCard from "./loading";

export default function ReflectionCard({...props}) {

    const [earned, setEarned] = useState(0);

    useEffect(async() => {
        let data = props.data;

        if (data.token.abbr == "enh") {
            let earned = await Functions.getDividends(data.address);
            setEarned(earned);
            return;
        }

        let txnList   = props.data.txnList;
        let balance   = await Functions.getBalance(data.token.address, data.address);
       
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
                <p className="small-text text-muted mb-1">Earnings</p>
                <p className="mb-0 fw-bold">
                    {Functions.formatNumber(earned, 9)} {props.data.token.rewards.toUpperCase()}
                </p>
            </Card.Body>
        </Card>
    )
}