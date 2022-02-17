import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { updateLocal } from "web3modal";

import * as Functions from "../../functions";

export default function ValueCard({...props}) {

    const [loading, setLoading] = useState(true);

    useEffect(async() => {
        if (!props.data) {
            return;
        }
        
        console.log(props.data);
        
        setLoading(false);
    }, [props.data])

    let icon = <i className="fad fa-spinner fa-pulse"></i>;

    return (
        <Card className="border-0 shadow-sm mb-3">
            <Card.Body>
                <p className="small-text text-muted mb-1">
                    Value USD
                </p>
                <p className="mb-0 fw-bold">
                    {loading ? icon : "$"+Functions.formatNumber(props.data.value, 2)}
                </p>
            </Card.Body>
        </Card>
    )
}