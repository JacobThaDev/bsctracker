import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

import * as Functions from "../../../functions";

export default function HolderCount({...props}) {

    const [loading, setLoading] = useState(false);
    
    const [tokenData, setTokenData] = useState({
        receivers: 0,
        senders: 0,
        transfers: 0
    });

    useEffect(async() => {
        setLoading(true);
        try {
            let api_url = process.env.NEXT_PUBLIC_API_URL;
            let res = await axios.get(api_url+"/price/"+props.token.address);
            let bitquery = res.data.bqdata;

            setTokenData({
                receivers: bitquery.receiver_count,
                senders: bitquery.sender_count,
                transfers: bitquery.count
            })

            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    }, [props.token]);

    let icon = <i className="fal fa-spinner fa-pulse"></i>;

    return(
        <Card className="border-0 shadow-sm mb-3">
            <Card.Body>
                <div className="d-flex">
                    <div className="w-100">
                        <p className="text-uppercase text-muted mb-0 small-text">
                            Hodlers
                        </p>
                        <span className="h4 font-weight-bold mb-0 text-info">
                            {loading ? icon : Functions.formatNumber(tokenData.receivers, 0)}
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
                {loading ? icon : Functions.formatNumber(tokenData.transfers)} Transfers
            </Card.Footer>
        </Card>
    )
}