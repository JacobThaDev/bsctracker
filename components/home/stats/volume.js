import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

import * as Functions from "../../../functions";

export default function Marketcap({...props}) {

    const [data, setData]     = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(async() => {
        if (!props.data) {
            setLoaded(false);
            return;
        }

        let price       = props.data.price;
        let circulating = props.data.circulating;

        let divideBy = Functions.getDivideBy(circulating);

        setData({
            price: price,
            market_cap: props.data.market_cap / divideBy
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
                            Price
                        </p>
                        <span className="h4 font-weight-bold mb-0 text-success">
                            {!loaded ? icon : "$"+Functions.formatNumber(data.price, 9) }
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
                {!loaded ? icon : "$"+Functions.formatNumber(data.market_cap, 2)} Market Cap
            </Card.Footer>
        </Card>
    )
}