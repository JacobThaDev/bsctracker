import { Divider, Grid, Progress, Text } from "@nextui-org/react";
import { useTracker } from "../../../context/tracker";
import Functions from "../../../helpers/Functions";
import SvgIcon from "../../global/SvgIcon";
import Token from "../../../helpers/Token";
import { useEffect } from "react";

export default function MarketPrice() {

    const { 
        active, time, pairId, price, setPrice
    } = useTracker();

    useEffect(() => {
        if (active.pairs.length === 0) {
            let token = new Token(active.contract, active.primaryPool);

            token.getPrice().then((res) => {
                setPrice(parseFloat(res.toFixed(active.decimals)));
            });
        }
    }, [active])

    const getPercentage = () => {
        let buys  = active.pairs[pairId].txns[time].buys;
        let sells = active.pairs[pairId].txns[time].sells;
        let total = buys + sells;

        if (buys === 0) {
            return 0;
        }
        
        return (buys / total) * 100;
    }

    let change = active && active.pairs.length > 0 ? active.pairs[pairId].priceChange[time] : 0;

    return(
        <>
            <Text size={12} color="$gray800">
                {active.symbol} Price (USD)
            </Text>

            <Grid.Container alignItems="center" justify="space-between">
                <Grid>
                    <Grid.Container alignItems="center">
                        <Grid css={{ pr: 10 }}>
                            <Text size={26} b>
                                ${active.pairs.length > 0
                                    ? active.pairs[pairId].priceUsd
                                    : price.toFixed(9) }
                            </Text>
                        </Grid>
                        <Grid>
                            { active.pairs.length > 0 &&
                            <Grid.Container alignItems="center">
                                <Grid css={{ pr: 5 }}>
                                    <Text css={{ lh: 1 }} color={change < 0 ? "error" : "success"}>
                                        <SvgIcon 
                                            icon={change < 0 ? "trending-down" : "trending-up"}
                                            size={18} 
                                            stroke={3} />
                                    </Text>
                                </Grid>
                                <Grid>
                                    <Text 
                                        css={{ lh: 1 }} 
                                        color={change < 0 ? "error" : "success"}>
                                            {change}%
                                    </Text>
                                </Grid>
                            </Grid.Container>}
                        </Grid>
                    </Grid.Container>
                </Grid>
            </Grid.Container>

            <Divider css={{ my: 20 }}/>

            {active.pairs.length > 0 &&
                <>
                    <Text size={14} css={{mb: 10}}>
                        {active.pairs[pairId].txns[time].buys} buys / {active.pairs[pairId].txns[time].sells} sells
                    </Text>
                    <Progress
                        color="primary"
                        size="sm"
                        value={getPercentage()}
                        css={{ mb: 10 }}/>
                </>
            }

            {active.pairs.length == 0 &&
                <>
                    <Text size={14} css={{mb: 10}}>
                        0 buys / 0 sells
                    </Text>
                    <Progress
                        color="primary"
                        size="sm"
                        value={50}
                        css={{ mb: 10 }}/>
                </>
            }

            <Text size={14}>
                Pair Created: {
                active.pairs.length > 0
                    ? Functions.getDateStr(active.pairs[pairId].pairCreatedAt, false)
                    : "Unknown"
                }
            </Text>
        </>
    )
}