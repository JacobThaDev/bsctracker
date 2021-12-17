import React  from 'react';
import { Card } from 'react-bootstrap';

export default function ValueCard({...props}) {

    return (<>
        <Card className="shadow-sm mb-3">
            <Card.Body>
                <p className="small text-muted mb-0">
                    Value (USD):
                </p>
                <p className="mb-0">
                    ${ (props.balance * props.price).toFixed(2) }
                </p>
            </Card.Body>
        </Card>
    </>);
    
}