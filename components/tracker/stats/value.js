import { useState } from "react";
import { Card } from "react-bootstrap";

import * as Functions from "../../../functions";

export default function ValueCard({...props}) {

    let data  = props.data;
    let total = parseFloat((data.tokenStats.price_usd * data.balance).toFixed(2));

    return (
        <Card className="border-0 shadow-sm mb-3">
            <Card.Body>
                <p className="small-text text-muted mb-1">
                    Value USD
                </p>
                <p className="mb-0 fw-bold">
                    ${Functions.formatNumber(total, 2)}
                </p>
            </Card.Body>
        </Card>
    )
}