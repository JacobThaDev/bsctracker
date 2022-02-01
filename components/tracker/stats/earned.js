import { useEffect } from "react";
import { Card } from "react-bootstrap";

import * as Functions from "../../../functions";

export default function Earned({... props}) {

    return(
        <Card className="border-0 shadow-sm">
            <Card.Body>
                <i className="far fa-exclamation-circle me-3 text-success"></i>
                You have earned&nbsp;
                <span className="fw-bold text-success"> 
                    
                </span>&nbsp;
                {props.token.toUpperCase()} this session
            </Card.Body>
        </Card>
    )

}