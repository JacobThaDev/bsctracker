import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

import * as Functions from "../../../functions";

export default function ValueCard({...props}) {

    const [value, setValue] = useState(0);

    useEffect(() => {
        let balance = props.data.balance;
        let price   = props.data.tokenStats.price_usd;
        let value   =  parseFloat((balance * price).toFixed(2))

        setValue(value);
    }, [props.data.balance])

    return (
        <Card className="border-0 shadow-sm mb-3">
            <Card.Body>
                <p className="small-text text-muted mb-1">
                    Value USD
                </p>
                <p className="mb-0 fw-bold">
                    ${Functions.formatNumber(value, 2)}
                </p>
            </Card.Body>
        </Card>
    )
}