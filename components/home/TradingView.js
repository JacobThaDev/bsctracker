import { Card } from "@nextui-org/react";
import { useTracker } from "../../context/tracker";

export default function TradingView() {

    const { active, pairId } = useTracker()

    if (!active) {
        return null;
    }

    return(
        <Card variant="" css={{ mb: 20 }}>
            <Card.Body css={{ p: 0 }}>
                {active.pairs.length > 0 &&
                    <iframe
                        src={`https://dexscreener.com/bsc/${active.pairs[pairId].pairAddress}?embed=1&theme=dark&info=0&trades=1`}
                        height={650} style={{border: 0}}>
                    </iframe>
                }

                {active.pairs.length == 0 &&
                    <iframe
                        src={`https://dexscreener.com/bsc/${active.primaryPool}?embed=1&theme=dark&info=0&trades=1`}
                        height={650} style={{border: 0}}>
                    </iframe>
                }
            </Card.Body>
        </Card>
    );
}