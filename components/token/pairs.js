import { Button, Card, Image, Table, Text } from "@nextui-org/react";
import { useTracker } from "../../context/tracker";

export default function TokenPairs() {

    const { active, pairId, setPairId } = useTracker();

    if (!active ) {
        return null;
    }
    
    const changePair = (key) => {
        setPairId(key);
        window.scrollTo(0, 0);
    }

    const getTable = () => {
        let table = [];

        for (let i = 0; i < active.pairs.length; i++) {
            let pair   = active.pairs[i];
            let change = pair.priceChange.h24;

            table.push(
                <Table.Row key={i}>
                    <Table.Cell css={{ width: 50 }}>
                        <Image src={`/img/dexes/${pair.dexId}.png`} width={20} />
                    </Table.Cell>
                    <Table.Cell><Text>{pair.quoteToken.symbol}</Text></Table.Cell>
                    <Table.Cell>
                        <Text color={change < 0 ? "error" : "success"}>
                            {pair.priceChange.h24}%
                        </Text>
                    </Table.Cell>
                    <Table.Cell>
                        <Text>
                        {pair.txns.h24.buys + pair.txns.h24.sells}
                        </Text>
                    </Table.Cell>
                    <Table.Cell>
                        <Button css={{ marginLeft:"auto"}}
                            auto 
                            disabled={i == pairId}
                            size="xs" 
                            onPress={() => changePair(i)}>
                            Select
                        </Button>
                    </Table.Cell>
                </Table.Row>
            )
        }

        return table;
    }

    return(
        <Card css={{ p: "1rem", bg:"transparent" }} variant="bordered">
            <Card.Header>
                Liquidity Pools
            </Card.Header>
            
            <Table
                lined
                sticked 
                shadow={false} 
                aria-label="Token pairs"
                css={{
                    height: "auto",
                    minWidth: "100%",
                }}>
                <Table.Header>
                    <Table.Column>&nbsp;</Table.Column>
                    <Table.Column>Pair</Table.Column>
                    <Table.Column>Change</Table.Column>
                    <Table.Column>Txns</Table.Column>
                    <Table.Column>&nbsp;</Table.Column>
                </Table.Header>
                <Table.Body>
                    {active.pairs && getTable()}
                </Table.Body>
            </Table>

            { active.pairs.length == 0 &&
                <Card.Footer>
                    <Text color="warning">
                        Warning: 
                        Could not load pairs. This token has not had any transactions 
                        in the last 24 hours.
                    </Text>
                </Card.Footer>
            }
        </Card>
    )

}