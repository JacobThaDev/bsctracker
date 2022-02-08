import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

import * as Functions from "../../../functions";

export default function Marketcap({...props}) {

    const [volume, setVolume]     = useState(0);
    const [mcap, setMcap]         = useState(0);
    const [loading, setLoading]   = useState(false);
    const [divideBy, setDivideBy] = useState(1);
    const [suffix, setSuffix]     = useState("B");

    useEffect(async() => {
        try {
            if (!props.token) {
                return;
            }
            
            let price       = props.token.price;
            let supply      = props.token.supply;
            let burned      = await Functions.getBurned(props.token);
            let circulating = supply - burned;

            setMcap(circulating * price);
            setVolume(props.token.volume_24h);

            setDivideBy(Functions.getDivideBy(price * circulating));
            setSuffix(Functions.getSuffix(price * circulating));

            setLoading(false);
        } catch(err) {
            console.log("Volume error", err);
        }
    }, [props.token]);

    let icon = <i className="fal fa-spinner fa-pulse"></i>;

    return(
        <Card className="border-0 shadow-sm mb-3">
            <Card.Body>
                <div className="d-flex">
                    <div className="w-100">
                        <p className="text-uppercase text-muted mb-0 small-text">
                            24h Volume
                        </p>
                        <span className="h4 font-weight-bold mb-0 text-success">
                            ${loading ? icon : Functions.formatNumber(volume, 2) }
                        </span>
                    </div>
                    <div className="pe-3">
                        <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                            <i className="fad fa-analytics fa-lg fa-fw"></i>
                        </div>
                    </div>
                </div>
            </Card.Body>
            <Card.Footer className="border-0 bg-transparent pt-0 text-muted small">
                ${loading ? icon : Functions.formatNumber(mcap/divideBy, 2) + suffix} Market Cap
            </Card.Footer>
        </Card>
    )
}