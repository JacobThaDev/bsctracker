import { useState } from "react";
import { Card } from "react-bootstrap";

import * as Functions from "../../../functions";
import LoadingCard from "./loading";

export default function PriceCard({...props}) {

    if (props.loading) {
        return <LoadingCard title="Price USD"/>;
    }

    return (
        <Card className="border-0 shadow-sm mb-3">
            <Card.Body>
                <p className="small-text text-muted mb-0">Price USD</p>
                <p className="mb-0 fw-bold">
                    ${Functions.formatNumber(props.data.tokenStats.price_usd, 9)}
                </p>
            </Card.Body>
        </Card>
    )
}