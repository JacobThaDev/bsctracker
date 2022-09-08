import { Card } from "@nextui-org/react";
import { useTracker } from "../../context/tracker";

export default function TradingChart() {

    const { active, pairId } = useTracker()

    if (!active) {
        return null;
    }

    return(
        <Card variant="" css={{ mb: 20, mt: 50 }}>
            <Card.Body css={{ p: 0 }}>
                {active.pairs.length > 0 &&
                    <embed
                        src={`https://dexscreener.com/bsc/${active.pairs[pairId].pairAddress}?embed=1&theme=dark&info=0&trades=1`}
                        height={700} 
                        style={{ border: 0 }}>
                    </embed>
                }

                {active.pairs.length == 0 &&
                    <embed
                        src={`https://dexscreener.com/bsc/${active.primaryPool}?embed=1&theme=dark&info=0&trades=1`}
                        height={700} 
                        style={{border: 0}}>
                    </embed>
                }
            </Card.Body>
        </Card>
    );
}