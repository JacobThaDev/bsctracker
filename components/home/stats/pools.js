import { Button, Card, Image, Modal, Table, Text, Grid, Divider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import LoadingCard from "../../loading";

const tokens = require("../../../tokens");

export default function PoolsCard({ pairId, stats, isLoading }) {

    if (!stats) {
        return <LoadingCard/>;
    }
    
    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
    }

    const changeSelected = (index) => {
        closeHandler();
    }

    if (!stats.stats) {
        return null;
    }
    
    return (<>
        <Card>
            <Card.Body css={{ pt: 18 }}>
                <Grid.Container justify="space-between" alignItems="center">
                    <Grid>
                        <Text size={12}>{stats && stats.stats.dexId}</Text>
                        <Text size={18} b>{stats.stats.baseToken.symbol+" / "+stats.stats.quoteToken.symbol}</Text>
                    </Grid>
                    <Grid>
                        <Button 
                            size="sm" 
                            color="primary"
                            rounded 
                            disabled={isLoading}
                            auto 
                            css={{ ml: 10 }} 
                            onClick={handler}>
                            Change
                        </Button>
                    </Grid>
                </Grid.Container>
            </Card.Body>
            <Card.Footer css={{ pt: 0 }}>
                {stats.holders.toLocaleString()} Holders
            </Card.Footer>
        </Card>

        <Modal width={900} aria-labelledby="modal-title" 
                open={visible} css={{ pt: 0}}
                onClose={closeHandler}>
            <Modal.Header css={{ ta: "left" }}>
                Token Pools
            </Modal.Header>
            <Modal.Body>
                <Table lined shadow={false} aria-label="Swaps"
                    css={{
                        p: 0,
                        height: "auto",
                        minWidth: "100%",
                    }}>
                    <Table.Header hideHeader css={{ mb: 0, pb: 0, br: 0 }}>
                        <Table.Column align="center">Dex</Table.Column>
                        <Table.Column>Pair / Price</Table.Column>
                        <Table.Column>24H Change</Table.Column>
                        <Table.Column hideHeader>Select</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {stats.pairs.map((item, index) => {
                            return <Table.Row key={index}>
                                <Table.Cell>
                                    <Image src={`/img/dexes/${item.dexId}.png`}
                                        width={24} height={24}/>
                                </Table.Cell>
                                <Table.Cell>
                                    <Text size={10}>
                                        {item.baseToken.symbol} / {item.quoteToken.symbol} 
                                    </Text>
                                    <Text size={14} b>
                                        ${item.priceUsd}
                                    </Text>
                                </Table.Cell>
                                <Table.Cell css={{ color: (item.priceChange.h24 < 0 ? "red" : "green") }}>
                                    {(item.priceChange.h24 > 0 ? "+" : "") + item.priceChange.h24}% 
                                </Table.Cell>
                                <Table.Cell>
                                    <Link href={`/${item.baseToken.symbol.toLowerCase() + "/"+item.pairAddress}`}>
                                        <Button auto
                                            rounded
                                            size="sm"
                                            disabled={!pairId && index == 0 || pairId == item.pairAddress}>
                                            Select
                                        </Button>
                                    </Link>
                                </Table.Cell>
                            </Table.Row>
                        })}
                    </Table.Body>
                </Table>
            </Modal.Body>
            <Divider/>
            <Modal.Footer>
                <Button size="sm" rounded color="success" onClick={() => setVisible(false)}>
                    Done
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )

}