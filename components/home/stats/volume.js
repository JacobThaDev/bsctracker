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
            setLoading(true);
            let api_url = process.env.NEXT_PUBLIC_API_URL;
            let res = await axios.get(api_url+"/price/"+props.token.address);
            setVolume(res.data.volume_24h_usd);

            let initial = props.token.supply;
            let burned  = await Functions.getBurned(props.token);
            
            let circulating = initial - burned;

            setMcap(res.data.price_usd * circulating);
            setLoading(false);
            setDivideBy(Functions.getDivideBy(res.data.price_usd * circulating));
            setSuffix(Functions.getSuffix(res.data.price_usd * circulating))
        } catch(err) {
            console.log(err);
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
                            ${loading ? icon : Functions.formatNumber(volume, 1)}
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