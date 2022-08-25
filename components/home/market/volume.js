import {Card, Dropdown, Grid, Text} from "@nextui-org/react";
import { useTracker } from "../../../context/tracker";
import Functions from "../../../helpers/Functions";
import SvgIcon from "../../global/SvgIcon";
import {useEffect, useState} from "react";

export default function MarketVolume() {

    const {
        active, pairId, time, getTimeName
    } = useTracker();

    return(
        <Card variant="" className="inner-card">
            <Card.Header>
                <Grid.Container alignItems="center">
                    <Grid css={{ mr: 5 }}>
                        <Text color="$primary">
                            <SvgIcon icon="clock" size={11} stroke={3} />
                        </Text>
                    </Grid>
                    <Grid>
                        <Text size={11} color="$gray800">
                            {getTimeName()} Volume
                        </Text>
                    </Grid>
                </Grid.Container>
            </Card.Header>
            { active.pairs.length > 0 &&
            <Card.Body css={{ pt: 0, pb: 10 }}>
                <Text size={14}>
                    ${Functions.formatNumber(active.pairs[pairId].volume[time])}
                </Text>
                <Text size={11} color={"$gray800"}>
                    {active.pairs[pairId].txns[time].buys + active.pairs[pairId].txns[time].sells} Trades
                </Text>
            </Card.Body>}

            { active.pairs.length == 0 &&
                <Card.Body css={{ pt: 0, pb: 10 }}>
                    <Text size={14}>
                        $0
                    </Text>
                    <Text size={11} color={"$gray800"}>
                        0 Trades
                    </Text>
                </Card.Body>}
        </Card>
    )
}