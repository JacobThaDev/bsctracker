import dynamic from "next/dynamic";
import {useEffect, useState} from "react";
import {Card, Text} from "@nextui-org/react";

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
    }, [txnList]);

    return(
        <Card css={{ p: "1rem", mb: 20 }} variant={""}>
            <Card.Header>Rewards Earned</Card.Header>
            { !token.distributor &&
            <Card.Body>
                <Text size={12}>
                    This token either doesn't have a rewards distributor, or we haven't added it yet.
                </Text>
            </Card.Body>}

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