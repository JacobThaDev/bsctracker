import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import FontIcon from "../../global/fonticon";

import * as Functions from '../../../functions';

const Web3  = require("web3");
const web3  = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org:443"));

export default function NblEarnings({...props}) {

    const [earned, setEarned]   = useState(0);
    const [loaded, setLoaded]   = useState(false);
    const [pending, setPending] = useState(0);

    const address  = "0xA67a13c9283Da5AABB199Da54a9Cb4cD8B9b16bA";
    const abi      = require("../../../abi/nbl");
    const contract = new web3.eth.Contract(abi, address);

    useEffect(async() => {
        if (!props.data) {
            return;
        }

        try {
            let data = await contract.methods.getAccountDividendsInfo(props.data.address).call();

            let earned = data[4] / 10 ** 18;
            setEarned(earned);

            let pending = data[3] / 10 ** 18;
            setPending(pending);
        } catch(err) {

        }

        setLoaded(true);
    }, []);

    let icon = <FontIcon icon="spinner" type="fad" pulse={true}/>;

    return (
        <>
            <Card className="border-0 shadow-sm mb-3">
                <Card.Body>
                    <p className="small-text text-muted mb-1">
                        Earnings (BUSD)
                    </p>
                    <p className="mb-0 fw-bold">
                        {!loaded ? icon : Functions.formatNumber(earned, 5)} 
                    </p>
                </Card.Body>
            </Card>
            <Card className="border-0 shadow-sm mb-3">
                <Card.Body>
                   

                    <p className="small-text text-muted mb-1">
                        Pending Rewards (BUSD)
                    </p>
                    <p className="mb-0 fw-bold">
                        {!loaded ? icon : Functions.formatNumber(pending, 5)} 
                    </p>
                    
                </Card.Body>
            </Card>
        </>
    )
}