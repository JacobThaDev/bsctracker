import { Card, Grid, Text, Link } from "@nextui-org/react";
import { useTracker } from "../../../context/tracker";
import Functions from "../../../helpers/Functions";
import SvgIcon from "../../global/SvgIcon";
import {useEffect, useState} from "react";
import Token from "../../../helpers/Token";

export default function MarketLiquidity() {

    const [ liquidity, setLiquidity ] = useState(0);

    const { 
        active, pairId, price
    } = useTracker();

    useEffect(() => {
        async function fallback() {
            let token = new Token(active.contract, active.primaryPool);
            let data  = await token.getPoolInfo();
            setLiquidity(data);
        }

        if (active.pairs.length === 0)
            fallback();
    }, [active]);

    let poolAddr = active.pairs.length > 0 ? active.pairs[pairId].pairAddress : active.primaryPool;

    return(
        <Card variant="" className="inner-card">
            <Card.Header>
                <Grid.Container alignItems="center">
                    <Grid css={{ mr: 5 }}>
                        <Text color="$primary">
                            <SvgIcon icon="droplet" size={11} stroke={3} />
                        </Text>
                    </Grid>
                    <Grid>
                        <Text size={11} color="$gray800">
                            Liquidity
                        </Text>
                    </Grid>
                </Grid.Container>
            </Card.Header>
            <Card.Body css={{ pt: 0, pb: 10 }}>
                <Text size={14}>
                    ${active.pairs.length > 0
                        ? Functions.formatNumber(active.pairs[pairId].liquidity.usd, 2)
                        : Functions.formatNumber(liquidity ? liquidity.value : 0, 2) }
                </Text>
                <Text size={11}>
                    <Link href={`https://bscscan.com/address/${poolAddr}`}
                        target="_blank" icon>
                        BscScan
                    </Link>
                </Text>
            </Card.Body>
        </Card>
    )
}