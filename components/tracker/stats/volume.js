import { useState } from "react";
import { Card } from "react-bootstrap";

import * as Functions from "../../../functions";
import LoadingCard from "./loading";

export default function Volume24hCard({...props}) {

    let data  = props.data;
    let total = parseFloat(data.tokenStats.volume_24h_usd.toFixed(2));

    return (
        <Card className="border-0 shadow-sm mb-3">
            <Card.Body>
                <p className="small-text text-muted mb-0">24H Volume USD</p>
                <p className="mb-0 fw-bold">
                    ${Functions.formatNumber(total, 2)}
                </p>
            </Card.Body>
        </Card>
    )
}