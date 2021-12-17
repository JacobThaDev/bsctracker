import React  from 'react';
import { Card } from 'react-bootstrap';

export default function EarnedValueCard({...props}) {

    let loadIcon = <i className="fal fa-spinner fa-pulse"></i>;

    return (<>
        <Card className="shadow-sm mb-3">
            <Card.Body>
                <p className="small text-muted mb-0">
                    Earnings Value (USD):
                </p>
                <p className="mb-0">
                    ${ (props.earned * props.price).toFixed(2) }
                </p>
            </Card.Body>
        </Card>
    </>);
    
}