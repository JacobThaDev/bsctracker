import {Card, Divider, Text} from "@nextui-org/react";
import {useEffect, useState} from "react";
import Functions from "../../../../helpers/Functions";

export default function BlockBusterEarnings({ token, txnList }) {

    const [ earned, setEarned ] = useState(0);
    const [ list, setList ] = useState(null);

    useEffect(() => {
        if (!txnList || earned) {
            return;
        }

        let distributor = token.distributor;
        let earned      = 0;
        let tokens      = [];
        let rewardList  = [];

        for (let i = 0; i < txnList.length; i++) {
            if (txnList[i].from.toLowerCase() !== distributor.toLowerCase()) {
                continue;
            }

            let inArray = false;

            for (let i = 0; i < tokens.length; i++) {
                if (tokens[i].symbol.toLowerCase() === txnList[i].tokenSymbol.toLowerCase()) {
                    inArray = true;
                    tokens[i].earned += txnList[i].value / 10 ** txnList[i].tokenDecimal;
                }
            }

            if (!inArray) {
                tokens.push({
                    name: txnList[i].tokenName,
                    address: txnList[i].contractAddress,
                    symbol: txnList[i].tokenSymbol,
                    decimals: txnList[i].tokenDecimal,
                    earned: txnList[i].value / 10 ** txnList[i].tokenDecimal
                })
            }
        }

        for (let i = 0; i < tokens.length; i++) {
            rewardList.push(
                <div key={i}>
                    <div className={"d-flex justify-content-between align-items-center"}>
                        <div>
                            <Text size={12} color={"$gray800"}>{tokens[i].symbol.toUpperCase()}</Text>
                        </div>
                        <div>
                            <Text>{Functions.formatNumber(tokens[i].earned, 3)}</Text>
                        </div>
                    </div>
                    <Divider css={{ my: 10 }}/>
                </div>
            )
        }

        setList(rewardList);
        setEarned(earned);
    }, [ txnList ]);

    return(
        <Card.Body>
            {list}
        </Card.Body>
    )
}