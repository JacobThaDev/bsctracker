import {Card, Grid, Image, Loading, Table, Text} from "@nextui-org/react";
import { useRouter } from "next/router";
import { useTracker } from "../../context/tracker";
import Functions from "../../helpers/Functions";

export default function Leaderboard({ title, sorting, tokens2 }) {

    const router = useRouter();
    const { tokens } = useTracker();

    const changeToken = (key) => {
        let address = key.currentKey;

        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].contract.toLowerCase() === address.toLowerCase()) {
                router.push("/token/"+tokens[i].symbol.toLowerCase());
                break;
            }
        }
    }

    const getSortedTable = () => {
        let table = [];
        let tokenCopy = tokens.map((x) => x);

        let sortedArray = tokenCopy.sort((a, b) => {
            let first   = a.pairs.length > 0 ? a.pairs[0].priceChange.h24 : 0;
            let second  = b.pairs.length > 0 ? b.pairs[0].priceChange.h24 : 0;
            return sorting === "asc" ? (first - second) : (second - first);
        });

        for (let i = 0; i < sortedArray.length; i++) {
            if (table.length == 5) {
                break;
            }
            
            let token  = sortedArray[i];

            if (token.pairs.length == 0) {
                continue;
            }
            
            let change = token.pairs[0].priceChange.h24;

            if ((sorting === "desc" && change < 0)
                    || (sorting === "asc" && change >= 0)) {
                continue;
            }

            table.push(
                <Table.Row key={token.contract}>
                    <Table.Cell>
                        <Grid.Container alignItems="center">
                            <Grid css={{ pr: 10 }}>
                                <Image src={"/img/tokens/"+token.symbol.toLowerCase()+".png"}
                                    width={30} style={{ height: 30 }}/>
                            </Grid>
                            <Grid>
                                <Text>{token.title}</Text>
                                <Text size={12} color="$gray800">
                                    {token.symbol}
                                </Text>
                            </Grid>
                        </Grid.Container>
                    </Table.Cell>
                    <Table.Cell css={{ ta: "end"}}>
                        <Text>
                            ${Functions.shortenPrice(token.pairs[0].priceUsd)}
                        </Text>
                        <Text size={12} color={token.pairs[0].priceChange.h24 < 0 ? "error" : "success"} >
                            {Functions.formatNumber(token.pairs[0].priceChange.h24, 2)}%
                        </Text>
                    </Table.Cell>
                </Table.Row>
            )
        }

        return table;
    }

    return(
        <div>
            <Text b>
                Top 5 {sorting == "desc" ? "Gainers" : "Losers"}
            </Text>

            <Table 
                selectionMode="single"
                onSelectionChange={changeToken}
                css={{ px: 0, mx: 0 }} 
                shadow={false} 
                aria-label={sorting == "desc" ? "Gainers" : "Losers"}>
                <Table.Header>
                    <Table.Column>Token</Table.Column>
                    <Table.Column css={{ ta: "right" }}>Price</Table.Column>
                </Table.Header>
                <Table.Body>
                    {getSortedTable()}
                </Table.Body>
            </Table>
        </div>
    )
}