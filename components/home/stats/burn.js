import { Card, Text } from "@nextui-org/react";
import Functions from "../../../helpers/Functions";
import LoadingCard from "../../loading";

export default function BurnCard({ data }) {

    if (!data) {
        return <LoadingCard/>;
    }
    
    let supply = data.supply;
    let burned = data.burned;
    let circulating = supply - burned;
    let percentage  = parseFloat(((burned / supply) * 100).toFixed(2));

    let color = "#000";

    if (percentage < 10) {
        color = "#62af66";
    } else if (percentage < 50) {
        color = "#f8716c";
    } else if (percentage < 90) {
        color = "#f8716c";
    }
    
    
    return(
        <Card shadow={true}>
            <Card.Body css={{ pt: 18 }}>
                <Text size={12}>Circulating</Text>
                <Text size={18} b>{(circulating).toLocaleString()}</Text>
            </Card.Body>
            <Card.Footer css={{ pt: 0 }}>
                <Text css={{ fontSize: 14 }}>
                    {Functions.shortenNumber(burned)} tokens burned
                </Text>
            </Card.Footer>
        </Card>
    )
}