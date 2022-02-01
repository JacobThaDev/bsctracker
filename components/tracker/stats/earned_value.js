import { useState } from "react";
import { Card } from "react-bootstrap";

import * as Functions from "../../../functions";
import LoadingCard from "./loading";

export default function EarnedValueCard({...props}) {

    if (props.loading) {
        return <LoadingCard title="Earned Value USD"/>;
    }

    let total = parseFloat((props.price * props.earned).toFixed(2));

    return (
        <Card className="border-0 shadow-sm mb-3">
            <Card.Body>
                <p className="small-text text-muted mb-0">Earned Value USD</p>
                <p className="mb-0 fw-bold">
                    $
                </p>
            </Card.Body>
        </Card>
    )
}