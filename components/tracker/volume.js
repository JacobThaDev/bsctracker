import React  from 'react';
import { Card } from 'react-bootstrap';

export default function VolumeCard({...props}) {

    return (<>
        <Card className="shadow-sm mb-3">
            <Card.Body>
                <p className="small text-muted mb-0">
                    Volume 24H (USD):
                </p>
                <p className="mb-0">
                    ${ props.volume.toLocaleString() }
                </p>
            </Card.Body>
        </Card>
    </>);
    
}