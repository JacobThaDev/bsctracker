import { useEffect, useState } from "react";
import { Card, Row, Col, Table, Alert  } from "react-bootstrap";

import * as Functions from '../../functions';

export default function V1Alert({...props}) {

    const [balance, setBalance] = useState(0);

    if (!props.address) {
        return null;
    }
    
    useEffect(async() => {
        let v1balance = await Functions.getv1Balance(props.address);
        setBalance(v1balance);
    }, []);

    if (balance < 1000000) {
        return null;
    }

    let v1 = Functions.formatNumber(balance, 9);

    return(
        <>
            <Alert variant="danger">
                <div className="d-flex align-items-center flex-lg-row flex-column">
                    <div className="flex-fill">
                        <p className="mb-0">
                            You're holding <strong className="fw-bold">{v1}</strong> tokens from the v1 contract. 
                            Don't forget to migrate!
                        </p>
                    </div>
                    <div>
                        <a href="https://swap.safemoon.net/#/swap?inputCurrency=0x8076C74C5e3F5852037F31Ff0093Eeb8c8ADd8D3&outputCurrency=0x42981d0bfbAf196529376EE702F2a9Eb9092fcB5" 
                            className="btn btn-outline-danger"
                            target="_blank"
                            rel="nofollow noopener">
                            Migrate Now
                        </a>
                    </div>
                </div>
                
            </Alert>
        </>
    )
}