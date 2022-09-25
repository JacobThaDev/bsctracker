import { Card, Divider, Text, Grid } from "@nextui-org/react";
import { useEffect, useState } from "react";
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
                if (tokens[i].address.toLowerCase() === txnList[i].contractAddress.toLowerCase()) {
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
                <Grid xs={6} sm={3} key={i} style={{ marginBottom: 20 }}>
                    <div>
                        <Text small color="$gray800">{tokens[i].name.toUpperCase()}</Text>
                        <Text size={16}>
                            {Functions.formatNumber(tokens[i].earned, 3)}
                        </Text>
                    </div>
                </Grid>
            )
        }

        setList(rewardList);
        setEarned(earned);
    }, [ txnList ]);

    return(
        <>
            <Card.Body css={{ px: 0 }}>
                <Grid.Container>
                    {list}
                </Grid.Container>
            </Card.Body>
            <Card.Footer css={{ px: 0, mt: 20 }}>
                <Text size={12} color="$gray800">
                    This token rewards in multiple tokens based on volume of the token
                    and varies on the amount you hold.
                </Text>
            </Card.Footer>
        </>
    )
}