import dynamic from "next/dynamic";
import {useEffect, useState} from "react";
import {Card, Divider, Text} from "@nextui-org/react";

export default function Rewards({ token, txnList }) {

    const [ Earned, setEarned ]     = useState(null);
    const [ earnings, setEarnings ] = useState(null);

    useEffect(() => {
        if (!txnList || Earned) {
            return;
        }

        if (token.distributor) {
            const DynamicCard = dynamic(() => import('./earned/' + token.symbol.toLowerCase()), {
                ssr: false
            });

            setEarned(DynamicCard);
        }
    }, [txnList, token]);

    return(
        <Card css={{ p: 0, mb: 20, mt: 30, bg: "transparent" }} variant={""}>
            <Card.Header css={{ px: 0 }}>
                <Text size={18}>Rewards Earned</Text>
            </Card.Header>

            { !token.distributor &&
                <Text size={12}>
                    This token either doesn't have a rewards distributor, or we haven't added it yet.
                </Text>}

            { token.distributor &&
                <>
                    {Earned
                        ? <Earned txnList={txnList} token={token} />
                        : <Card.Body><Text>Loading</Text></Card.Body>
                    }
                    </>
                }
        </Card>
    )
}