import { Card, Text } from "@nextui-org/react";
import LoadingCard from "../../loading";

const Functions = require("../../../helpers/Functions");

export default function MarketCard({ data }) {

    if (!data) {
        return <LoadingCard/>;
    }
    
    return(
        <Card shadow={true}>
            <Card.Body css={{ pt: 18 }}>
                <Text size={12}>
                    Market Cap (FDV)
                </Text>
                <Text size={18} b>
                    ${data.stats.fdv.toLocaleString()}
                </Text>
            </Card.Body>
            <Card.Footer css={{ pt: 0 }}>
                <Text css={{ fontSize: 14 }}>
                    Created {data.stats.pairCreatedAt ? Functions.getDateStr(data.stats.pairCreatedAt) : "unknown"}
                </Text>
            </Card.Footer>
        </Card>
    )
}