import { Badge, Card, Text, Table, Image, Divider, Grid, Button, Dropdown, Avatar } from "@nextui-org/react"
import { useState, useEffect } from "react";
import Token from "../../helpers/Token";
import Functions from "../../helpers/Functions";
import { useTracker } from "../../context/tracker";
import SvgIcon from "../global/SvgIcon";
import { useRouter } from "next/router";

export default function TokenTable() {

    const router = useRouter();
    const { tokens, time, setTime, getTimeName, refreshData }  = useTracker();

    const changeToken = (key) => {
        let address = key.currentKey;
        let token;

        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].contract.toLowerCase() === address.toLowerCase()) {
                router.push("/token/"+tokens[i].symbol.toLowerCase());
                break;
            }
        }
    }

    const getSortedItems = () => {
        let table = [];

        tokens.map((item, index) => {
            table.push(
                <Table.Row key={item.contract}>
                    <Table.Cell>
                        <Grid.Container alignItems="center">
                            <Grid css={{ pr: 20 }}>
                                <Avatar
                                    size="lg"
                                    src={`/img/tokens/${item.symbol.toLowerCase()}.png`}
                                />
                            </Grid>
                            <Grid className="d-none d-sm-inline-block">
                                <Text>{item.title}</Text>
                                <Text size={12} color={"$gray800"}>{item.symbol}</Text>
                            </Grid>
                        </Grid.Container>
                    </Table.Cell>
                    <Table.Cell css={{ textAlign: "right"}}>
                        {item.pairs.length > 0  && <>
                            <Text>
                                ${Functions.shortenPrice(item.pairs[0].priceUsd)}
                            </Text>
                            <Text color={item.pairs[0].priceChange[time] >= 0 ? "success" : "error"}>
                                {item.pairs[0].priceChange[time] >= 0 && <>+</>}
                                {item.pairs[0].priceChange[time]}%
                            </Text>
                        </>}
                    </Table.Cell>
                    <Table.Cell css={{ ta: "right" }}>
                        <Text>
                            {item.pairs.length > 0 
                                ? <>${Functions.formatNumber(item.pairs[0].volume[time])}</>
                                : "-" }
                        </Text>
                    </Table.Cell>
                </Table.Row>
            )
        });

        return table;
    }

    let table = getSortedItems()

    return(
        <div style={{ width: "100%" }}>
            <Grid.Container alignItems="center">
                <Grid css={{ mr: "auto" }}>
                    <div>
                        <Text size={24} css={{ lh: 1.4 }}>
                            Token Prices <small>{table && table.length} tokens</small>
                        </Text>
                        <Text size={12} color={"$gray800"}>
                            Select a token to view details
                        </Text>
                    </div>
                </Grid>
                <Grid>
                    <Grid.Container>
                        <Grid css={{ mr: 10 }}>
                            <Dropdown aria-label="Dropdown">
                                <Dropdown.Button rounded>
                                    <SvgIcon icon={"clock"} size={16} stroke={2}/>&nbsp;
                                    {getTimeName()}
                                </Dropdown.Button>
                                <Dropdown.Menu
                                    aria-label="Static Actions"
                                    selectionMode={"single"}
                                    onSelectionChange={(key) => setTime(key.currentKey)}>
                                    <Dropdown.Item key="h24">
                                        24 hours
                                    </Dropdown.Item>
                                    <Dropdown.Item key="h6">
                                        6 hours
                                    </Dropdown.Item>
                                    <Dropdown.Item key="h1">
                                        1 hour
                                    </Dropdown.Item>
                                    <Dropdown.Item key="m5">
                                        5 minutes
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Grid>
                        <Grid>
                            <Button auto ghost rounded onPress={refreshData}>
                                Refresh
                            </Button>
                        </Grid>
                    </Grid.Container>
                </Grid>
            </Grid.Container>

            <Table shadow={false} css={{ px: 0 }} 
                onSelectionChange={changeToken}
                selectionMode="single" 
                aria-label="Token prices">
                <Table.Header>
                    <Table.Column>
                        Title
                    </Table.Column>
                    <Table.Column css={{ ta: "right "}}>
                        Price
                    </Table.Column>
                    <Table.Column css={{ ta: "right" }}>
                        Volume {getTimeName()}
                    </Table.Column>
                </Table.Header>
                <Table.Body>
                    {table}
                </Table.Body>
            </Table>
        </div>
    )
}