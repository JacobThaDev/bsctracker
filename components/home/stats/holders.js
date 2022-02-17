import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

import * as Functions from "../../../functions";
import FontIcon from "../../global/fonticon";

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


    let icon = <FontIcon icon="spinner" type="fad" pulse={true}/>;

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
                            <FontIcon icon="wallet" type="fad" size="lg" />
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