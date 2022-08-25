import {Card, Image, Loading, Table, Text} from "@nextui-org/react";
import Functions from "../../helpers/Functions";

export default function Leaderboard({ tokens, title, sorting, tokens2 }) {

    const getSortedTable = () => {
        let table = [];
        let tokenCopy = tokens.map((x) => x);

        let sortedArray = tokenCopy.sort((a, b) => {
            let first   = a.bestPair ? a.bestPair.priceChange.h24 : 0;
            let second  = b.bestPair ? b.bestPair.priceChange.h24 : 0;
            return sorting === "asc" ? (first - second) : (second - first);
        });

        for (let i = 0; i < sortedArray.length; i++) {
            if (table.length == 5) {
                break;
            }

            let token  = sortedArray[i];

            if (!token.bestPair) {
                continue;
            }

            let change = token.bestPair.priceChange.h24;

            if ((sorting === "desc" && change < 0)
                    || (sorting === "asc" && change >= 0)) {
                continue;
            }

            table.push(
                <Table.Row key={i}>
                    <Table.Cell>
                        <Image src={"/img/tokens/"+token.symbol.toLowerCase()+".png"}
                               width={20}/>
                    </Table.Cell>
                    <Table.Cell>
                        <Text size={13}>
                            {token.symbol}
                        </Text>
                    </Table.Cell>
                    <Table.Cell>
                        <Text size={13}>
                            {Functions.shortenPrice(token.bestPair.priceUsd)}
                        </Text>
                    </Table.Cell>
                    <Table.Cell>
                        <Text color={token.bestPair.priceChange.h24 < 0 ? "error" : "success"} size={13}>
                            {Functions.formatNumber(token.bestPair.priceChange.h24, 2)}%
                        </Text>
                    </Table.Cell>
                </Table.Row>
            )
        }

        return table;
    }

    return(
        <Card css={{ p: "1rem", mb: 20 }} variant={""}>
            <Card.Header>
                {title}
            </Card.Header>

            { !tokens &&
                <Card.Body>
                    <Loading/>
                </Card.Body>
            }

            {tokens &&
                <Table sticked shadow={false} aria-label={"gainers"}>
                    <Table.Header>
                        <Table.Column css={{w: 30}}>&nbsp;</Table.Column>
                        <Table.Column>Token</Table.Column>
                        <Table.Column>Price</Table.Column>
                        <Table.Column>24h%</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {getSortedTable()}
                    </Table.Body>
                </Table>
            }
        </Card>
    )
}