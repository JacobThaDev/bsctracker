import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

import * as Functions from "../../../functions";

export default function Burned({...props}) {

    const [loading, setLoading]         = useState(false);
    const [circulating, setCirculating] = useState(0);
    const [burned, setBurned]           = useState(0);
    const [suffix, setSuffix]           = useState("B");

    useEffect(async() => {
        setLoading(true);

        let initial  = props.token.supply;
        let divideBy = Functions.getDivideBy(initial);
        let burned   = await Functions.getBurned(props.token);

        setCirculating((initial - burned) / divideBy);
        setBurned(burned / divideBy);
        setSuffix(Functions.getSuffix(burned));
        setLoading(false);
    }, [props.token]);

    let icon = <i className="fal fa-spinner fa-pulse"></i>;

    return(
        <Card className="border-0 shadow-sm  mb-3">
            <Card.Body>
                <div className="d-flex">
                    <div className="w-100">
                        <p className="text-uppercase text-muted mb-0 small-text">
                            Burned
                        </p>
                        <span className="h4 font-weight-bold mb-0 text-danger">
                            {loading ? icon : Functions.formatNumber(burned, 3)}
                            <small>{suffix}</small>
                        </span>
                    </div>
                    <div className="pe-3">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fad fa-fire fa-lg fa-fw"></i>
                        </div>
                    </div>
                </div>
            </Card.Body>
            <Card.Footer className="border-0 bg-transparent pt-0 text-muted small">
                {loading ? icon : Functions.formatNumber(circulating, 3) + suffix} Circulating
            </Card.Footer>
        </Card>
    )
}