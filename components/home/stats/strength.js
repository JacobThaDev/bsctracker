import { Card, Progress, Text } from "@nextui-org/react";
import Functions from "../../../helpers/Functions";

export default function StrengthCard({ data }) {

    if (!data) {
        return null;
    }
    
    let total = 0, buys = 0, sells = 0;
    let buyPressure = 0;

    if (data && data.stats) {
        buys  = data.stats.txns.h24.buys;
        sells = data.stats.txns.h24.sells;
        total = buys + sells;

        buyPressure = parseFloat(((buys / total) * 100).toFixed(2));
    }

    let status = "success";

    if (buyPressure < 25) {
        status = "error"
    } else if (buyPressure < 50) {
        status = "warning"
    } else {
        status = "success";
    }

    return(
        <Card shadow={true}>
            <Card.Body css={{ pb: 0 }}>
                <Text size={12}>Buying / Selling Pressure</Text>
                <Text size={18}>
                    {Functions.formatNumber(buys)} buys / {Functions.formatNumber(sells)} sells ({ buyPressure }%)</Text>
            </Card.Body>
            <Card.Footer css={{ pb: 20 }}> 
                <Progress 
                    indeterminated={!data}
                    color={status}  
                    status={status} 
                    value={buyPressure} />
            </Card.Footer>
        </Card>
    )
}