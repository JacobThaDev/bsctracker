import {
    Card,
    Divider,
    Grid,
    Image,
    Table,
    Text,
    useModal
} from "@nextui-org/react";

import Functions from "../../helpers/Functions";
import { useEffect, useState } from "react";
import Token from "../../helpers/Token";
import Wallet from "../../helpers/Wallet";

export default function TokenList({ wallets, changeToken }) {

    if (!wallets) {
        return null;
    }

    return(
        <div style={{ width: "100%", marginBottom: 30 }}>
            <div style={{ marginBottom: 30 }}>
                <Text size={20}>
                    Token Allocation <small>{wallets.length} Tokens</small>
                </Text>
                <Text size={12} color={"$gray800"}>
                    Select a token to view full details.
                </Text>
            </div>

            { wallets &&
                <Table aria-label={"table"}
                   shadow={false}
                   css={{ p:0 }}
                   onSelectionChange={changeToken}
                   selectionMode={"single"}>
                <Table.Header>
                    <Table.Column>Title</Table.Column>
                    <Table.Column>Balance</Table.Column>
                    <Table.Column>Value</Table.Column>
                </Table.Header>
                <Table.Body items={wallets}>
                    {(item) => (
                        <Table.Row key={item.contract} css={{ opacity: item.wallet && item.wallet.balance > 0 ? 1 : 0.5 }}>
                            <Table.Cell>
                                <Grid.Container alignItems={"center"}>
                                    <Grid css={{ pr: 10 }}>
                                        <Image src={"/img/tokens/"+item.symbol.toLowerCase()+".png"}
                                               style={{ width: 30 }}/>
                                    </Grid>
                                    <Grid className={"d-none d-lg-inline-block"}>
                                        <Text>{item.title}</Text>
                                        <Text size={12} color="$gray800">{item.symbol}</Text>
                                    </Grid>
                                </Grid.Container>

                            </Table.Cell>
                            <Table.Cell >
                                <Text size={14}>
                                    { item.wallet 
                                        ? Functions.shortenNumber(item.wallet.balance, 4) 
                                        : 0 }
                                </Text>
                            </Table.Cell>
                            <Table.Cell>
                                <Text size={14}>
                                    ${ item.wallet 
                                        ? item.wallet.total_value 
                                        : 0 }
                                </Text>
                                <Text size={12} color={"$gray800"}>
                                    @ ${ item.wallet ? Functions.formatNumber(item.wallet.price, 9) : 0 }
                                </Text>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
                <Table.Pagination size="lg" noMargin align="center" rowsPerPage={10} />
            </Table> }
        </div>
    )
}