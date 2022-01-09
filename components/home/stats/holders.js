import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import * as Functions from '../../../functions';
import FontIcon from "../../global/fonticon";

export default function HoldersCard({ ... props}) {

    const [holders, setHolders] = useState(null);

    useEffect(async() => {
        try {
            let res = await axios('https://graphql.bitquery.io', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-API-KEY': process.env.NEXT_PUBLIC_BITQUERY
                },
                data: {
                    query: "query ($network: EthereumNetwork!, $token: String!, $from: ISO8601DateTime, $till: ISO8601DateTime) {ethereum(network: $network) {transfers(currency: {is: $token}, amount: {gt: 0}, date: {since: $from, till: $till}) {receiver_count: count(uniq: receivers)}}}",
                    variables: {
                        "limit": 10,
                        "offset": 0,
                        "network": "bsc",
                        "token": process.env.NEXT_PUBLIC_ADDRESS
                    }
                }
            });

            let receivers = res.data['data']['ethereum']['transfers'][0]['receiver_count'];
        
            setHolders(receivers);
        } catch (err) {
            console.log("ERROR")
        }
    }, []);

    let icon = <i className="fal fa-spinner fa-pulse"></i>;
    let holderCount = icon;

    if (holders)
        holderCount = holders;

    return(<>
    <Card className="shadow mb-3">
        <Card.Body>
            <div className="d-flex align-items-center">
                <div className="px-3">
                    <FontIcon 
                        icon="hand-holding-usd" 
                        color="primary" 
                        size="lg"
                        className="hover-icon"/>
                </div>
                <div>
                    <p className="small mb-0 text-muted">
                        Holders
                    </p>
                    <p className="mb-0">
                        {Functions.formatNumber(holderCount, 0)}
                    </p>
                </div>
            </div>
        </Card.Body>
    </Card>
    </>)

}