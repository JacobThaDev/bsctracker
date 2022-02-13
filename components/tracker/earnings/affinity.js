import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import * as Functions from "../../../functions";

export default function AffinityEarnings({...props}) {

    const [earned, setEarned] = useState({
        busd: 0,
        ada: 0,
        ada_value: 0
    });

    const [loaded, setLoaded] = useState(false);

    useEffect(async() => {
        if (!props.data)
            return;

        let filtered = [];
        let busd      = "0xe9e7cea3dedca5984780bafc599bd69add087d56";
        let cardano   = "0x3ee2200efb3400fabb9aacf31297cbdd1d435d47";
        let liquidity = "0x28415ff2C35b65B9E5c7de82126b4015ab9d031F";

        let reflected = {
            busd: 0,
            ada: 0,
            ada_value: 0
        };

        let ada_price = await Functions.getTokenPrice2(cardano, liquidity);
        console.log(ada_price);

        props.data.txnList.forEach((txn) => {
            if (txn.from == "0xb81b272fde39f698c69a67620aa9978724e770cd"
                    && txn.to == props.data.address.toLowerCase()) {
            
                let decimals = txn.tokenDecimal;
                let amount = txn.value / 10 ** decimals;

                if (txn.contractAddress.toLowerCase() == cardano) {
                    reflected.ada += amount;
                } else if (txn.contractAddress.toLowerCase() == busd) {
                    reflected.busd += amount;
                } else {
                    filtered.push(txn);
                }
            }
        });

        reflected.ada_value = reflected.ada * ada_price;

        setEarned(reflected);
        setLoaded(true);

        console.log("found txns", reflected);

        /*let distributor = "0xb81b272fde39f698c69a67620aa9978724e770cd";
        let busd        = "0x14fee7d23233ac941add278c123989b86ea7e1ff";
        let cardano     = "0x3ee2200efb3400fabb9aacf31297cbdd1d435d47";

        let busd_total = 0;
        let ada_total  = 0;

        for (let txn of props.data.txnList) {
            if (txn.from != "0x14fee7d23233ac941add278c123989b86ea7e1ff") {
                continue;
            }

            let value = (txn.value / 10 ** txn.tokenDecimal);
            total += value;
        }

        setEarned(total);
        setLoaded(true);*/
    }, [props.data]);

    let icon = <i className="fad fa-spinner fa-pulse"></i>;
    
    return (
        <>
            <Card className="border-0 shadow-sm mb-3">
                <Card.Body>
                    <p className="small-text text-muted mb-1">
                        Earnings (BUSD)
                    </p>
                    <p className="mb-0 fw-bold">
                        {!loaded ? icon : Functions.formatNumber(earned.busd, 5)} 
                    </p>
                </Card.Body>
            </Card>
            <Card className="border-0 shadow-sm mb-3">
                <Card.Body>
                    <p className="small-text text-muted mb-1">
                        Earnings (Cardano)
                    </p>
                    <p className="mb-0 fw-bold">
                        {!loaded ? icon : Functions.formatNumber(earned.ada, 5)} 

                    </p>
                </Card.Body>
                <Card.Footer className="text-muted small border-0 bg-transparent pt-0">
                    ${Functions.formatNumber(parseFloat((earned.ada_value).toFixed(2)), 2)} USD
                </Card.Footer>
            </Card>
        </>
    )
}