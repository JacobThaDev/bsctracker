import { useState } from "react";
import { Card } from "react-bootstrap";

import * as Functions from "../../../functions";

export default function LoadingCard({...props}) {

    return (
        <Card className="border-0 shadow-sm mb-3">
            <Card.Body>
                <p className="small-text text-muted mb-0">{props.title}</p>
                <p className="mb-0">
                    <i className="fad fa-spinner fa-pulse"/>
                </p>
            </Card.Body>
        </Card>);
}