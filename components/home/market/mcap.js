import { Card, Grid, Text } from "@nextui-org/react";
import { useTracker } from "../../../context/tracker";
import Functions from "../../../helpers/Functions";
import SvgIcon from "../../global/SvgIcon";
import {useEffect, useState} from "react";
import Token from "../../../helpers/Token";

export default function MarketCap() {

    const [ mcap, setMcap ] = useState(0);

    const { 
        active, pairId
    } = useTracker();

    useEffect(() => {

        async function fallback() {
            setMcap(null);
            let token     = new Token(active.contract, active.primaryPool);
            let supply    = await token.getSupply();
            let price     = await token.getPrice();
            let marketCap = supply * price;

            setMcap(marketCap)
        }

        if (active.pairs.length === 0)
            fallback();
    }, [active]);

    return(
        <Card variant="" className="inner-card">
            <Card.Header>
                <Grid.Container alignItems="center">
                    <Grid css={{ mr: 5 }}>
                        <Text color="$primary">
                            <SvgIcon icon="activity" size={11} stroke={3} />
                        </Text>
                    </Grid>
                    <Grid>
                        <Text size={11} color="$gray800">
                            Market Cap
                        </Text>
                    </Grid>
                </Grid.Container>
            </Card.Header>
            <Card.Body css={{ pt: 0, pb: 10 }}>
                <Text size={14}>
                    { active.pairs.length > 0 &&
                        <>
                            ${Functions.formatNumber(active.pairs[pairId].fdv, 2)}
                        </>
                    }

                    {active.pairs.length === 0 && mcap &&
                    <>
                        ${Functions.formatNumber(parseFloat(mcap.toFixed(2)), 2)}
                    </>}

                    {active.pairs.length === 0 && !mcap &&
                        <>
                            Loading...
                        </>}
                </Text>
                <Text size={11} color={"$gray800"}>
                    F.D.V.
                </Text>
            </Card.Body>
        </Card>
    )
}