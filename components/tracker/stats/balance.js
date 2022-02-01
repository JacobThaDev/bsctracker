import { Card } from "react-bootstrap";
import * as Functions from "../../../functions";

export default function BalanceCard({...props}) {
    
    return (
        <Card className="border-0 shadow-sm mb-3">
            <Card.Body>
                <p className="small-text text-muted mb-1">Balance</p>
                <p className="mb-0 fw-bold">
                    {Functions.formatNumber(props.data.balance, 4)}
                </p>
            </Card.Body>
        </Card>
    )
}