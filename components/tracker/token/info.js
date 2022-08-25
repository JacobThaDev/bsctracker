import {Button, Card, Grid, Image, Text} from "@nextui-org/react";
import MarketInfo from "../../home/market/info";
import MarketPrice from "../../home/market/price";
import {useEffect, Suspense, useState} from "react";
import Functions from "../../../helpers/Functions";
import SvgIcon from "../../global/SvgIcon";
import GridRow from "../../grid/Row";
import Link from "next/link";
import GridCol from "../../grid/Column";
import dynamic from "next/dynamic";

export default function TokenInfo({ token, balance, txnList, price, address }) {

    const [ updated, setUpdated ] = useState(null);

    useEffect(() => {
        setUpdated(new Date().toLocaleString());
    }, []);

    return(
        <Card variant={""} css={{ p: "1rem", mb: 20 }}>
            <Card.Header>
                <Grid.Container alignItems={"center"} justify={"space-between"} css={{width: "100%"}}>
                    <Grid>
                        <Text>{token.title} ({token.symbol})</Text>
                        <Text size={12} color={"$gray800"}>Updated {updated ? updated : "..."}</Text>
                    </Grid>
                    <Grid>
                        <Link href={"/track/"+address}>
                            <Button auto ghost>
                                Back to Portfolio
                            </Button>
                        </Link>
                    </Grid>
                </Grid.Container>

            </Card.Header>
            <Card.Body>

                <GridRow className={"align-items-center"}>
                    <GridCol xs={12} lg={3}>
                        <Text size={12} color={"$gray800"}>
                            Value
                        </Text>
                        <Text size={30} b>
                            ${Functions.formatNumber(parseFloat((balance * price).toFixed(2)), 2)}
                        </Text>
                    </GridCol>


                    <GridCol xs={12} lg={3}>
                        <Card variant={""} className={"inner-card"}>
                            <Card.Header>
                                <Text size={14} color={"$gray800"}>
                                    Balance
                                </Text>
                            </Card.Header>
                            <Card.Body css={{ pt: 0, pb: 10 }}>
                                <Text>{Functions.formatNumber(balance, 6)}</Text>
                            </Card.Body>
                        </Card>
                    </GridCol>

                    <GridCol xs={12} lg={3}>
                        <Card variant={""} className={"inner-card"}>
                            <Card.Header>
                                <Text size={14} color={"$gray800"}>Price</Text>
                            </Card.Header>
                            <Card.Body css={{ pt: 0, pb: 10 }}>
                                <Text>${Functions.formatNumber(price, 12)}</Text>
                            </Card.Body>
                        </Card>
                    </GridCol>
                </GridRow>


            </Card.Body>
        </Card>
    )

}