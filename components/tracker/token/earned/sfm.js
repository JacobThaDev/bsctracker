import {Card, Text} from "@nextui-org/react";
import {useEffect, useState} from "react";
import Functions from "../../../../helpers/Functions";

export default function SafeMoonEarnings({ token, txnList }) {

    const [ filtered, setFiltered ] = useState(null);
    const [ earned, setEarned ]     = useState(0);

    useEffect(() => {
        if (!txnList) {
            return;
        }

        let distributor   = token.distributor;
        let rewardAddress = "0x42981d0bfbAf196529376EE702F2a9Eb9092fcB5";
        let earned        = 0;

        for (let i = 0; i < txnList.length; i++) {
            if (txnList[i].from.toLowerCase() !== distributor.toLowerCase()
                    || txnList[i].contractAddress.toLowerCase() !== rewardAddress.toLowerCase()) {
                continue;
            }

            if (txnList[i].from.toLowerCase() === distributor.toLowerCase()) {
                earned += parseFloat(txnList[i].value / 10 ** txnList[i].tokenDecimal);
            }
        }

        setEarned(earned);
    }, [ txnList ]);

    return(
        <>
        <Card.Body css={{ p: 0 }}>
            <Text size={12} color={"$gray800"}>SFM</Text>
            <Text size={16}>{Functions.formatNumber(earned, 9)} </Text>
        </Card.Body>
        <Card.Footer css={{ px: 0, mt: 20 }}>
            <Text size={12} color="$gray800">
                This token rewards in SFM based on volume of the token
                and varies on the amount you hold.
            </Text>
        </Card.Footer>
        </>
    )
}