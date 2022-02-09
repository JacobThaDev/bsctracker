import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

import * as Functions from "../../../functions";

export default function HolderCount({...props}) {

    const [loaded, setLoaded] = useState(true);
    
    const [tokenData, setTokenData] = useState({
        receivers: 0,
        senders: 0,
        transfers: 0
    });

    useEffect(async() => {
        if (!props.data) {
            setLoaded(false);
            return;
        }

        setTokenData({
            receivers: props.data.holders,
            transfers: props.data.transfers
        });

        setLoaded(true);
    }, [props.data]);

    let icon = <i className="fad fa-spinner fa-pulse"></i>;

    return(
        <Card className="border-0 shadow-sm mb-3">
            <Card.Body>
                <div className="d-flex">
                    <div className="w-100">
                        <p className="text-uppercase text-muted mb-0 small-text">
                            Hodlers
                        </p>
                        <span className="h4 font-weight-bold mb-0 text-info">
                            {!loaded ? icon : Functions.formatNumber(tokenData.receivers, 0)}
                        </span>
                    </div>
                    <div className="pe-3">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fad fa-wallet fa-lg fa-fw"></i>
                        </div>
                    </div>
                </div>
            </Card.Body>

            <Card.Footer className="border-0 bg-transparent pt-0 text-muted small">
                {!loaded ? icon : Functions.formatNumber(tokenData.transfers)} Transfers
            </Card.Footer>
        </Card>
    )
}