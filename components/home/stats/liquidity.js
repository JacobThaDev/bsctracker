import { Card, Grid, Link, Progress, Text,  } from "@nextui-org/react";
import LoadingCard from "../../loading";

const tokens = require("../../../tokens");
const Functions = require("../../../helpers/Functions");

export default function LiquidityCard({ data }) {

    if (!data) {
        return <LoadingCard/>;
    }

    return(
        <Card shadow={true}>
            <Card.Body css={{ pt: 18 }}>
                <Text size={12}>
                    Liquidity
                </Text>
                <Text size={18} b>
                    ${data.stats.liquidity.usd.toLocaleString() }
                </Text>
            </Card.Body>
            <Card.Footer css={{ pt: 0 }}>
                <Link href={"https://bscscan.com/address/"+data.stats.pairAddress} icon
                    target="_blank" rel="noreferrer noopener nofollow">
                    View on BscScan
                </Link>
            </Card.Footer>
        </Card>
    )
}