import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

import * as Functions from "../../../functions";
import FontIcon from "../../global/fonticon";

export default function Marketcap({...props}) {
    let icon = <FontIcon icon="spinner" type="fad" pulse={true}/>;

    return(
        <Card className="border-0 shadow-sm mb-3">
            <Card.Body>
                <div className="d-flex">
                    <div className="w-100">
                        <p className="text-uppercase text-muted mb-0 small-text">
                            Price
                        </p>
                        <span className="h4 font-weight-bold mb-0 text-success">
                            {!props.token ? icon : "$"+Functions.formatNumber(props.token.price, 9) }
                        </span>
                    </div>
                    <div className="pe-3">
                        <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                            <FontIcon icon="analytics" type="fad" size="lg" />
                        </div>
                    </div>
                </div>
            </Card.Body>
            <Card.Footer className="border-0 bg-transparent pt-0 text-muted small">
                {!props.token ? icon : "$"+Functions.shortenNumber(props.token.marketcap, 2)} Market Cap
            </Card.Footer>
        </Card>
    )
}