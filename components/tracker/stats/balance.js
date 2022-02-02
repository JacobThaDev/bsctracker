import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import * as Functions from "../../../functions";

export default function BalanceCard({...props}) {
    
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        setBalance(props.data.balance);
    }, [props.data.balance]);

    return (
        <Card className="border-0 shadow-sm mb-3">
            <Card.Body>
                <p className="small-text text-muted mb-1">Balance</p>
                <p className="mb-0 fw-bold">
                    {Functions.formatNumber(balance, 9)}
                </p>
            </Card.Body>
        </Card>
    )
}