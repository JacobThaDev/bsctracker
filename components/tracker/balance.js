import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import * as Functions from "../../functions";

export default function BalanceCard({...props}) {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!props.data) {
            return;
        }
        
        setLoading(false);
    }, [props.data]);

    let icon = <i className="fad fa-spinner fa-pulse"></i>;

    return (
        <Card className="border-0 shadow-sm mb-3">
            <Card.Body>
                <p className="small-text text-muted mb-1">Balance</p>
                <p className="mb-0 fw-bold">
                    {loading ? icon : Functions.formatNumber(props.data.balance, 5)}
                </p>
            </Card.Body>
        </Card>
    )
}