import React  from 'react';
import { Card } from 'react-bootstrap';

export default function EarningsCard({...props}) {

    let loadIcon = <i className="fal fa-spinner fa-pulse"></i>;

    return (<>
        <Card className="shadow-sm mb-3">
            <Card.Body>
                <p className="small text-muted mb-0">
                    Earnings:
                </p>
                <p className="mb-0">
                    { props.reflections ? props.reflections.toLocaleString(undefined, { 
                        minimumFractionDigits: 6
                    }) : loadIcon }
                </p>
            </Card.Body>
        </Card>
    </>);
    
}