import { Card, Loading, Text } from "@nextui-org/react";
import SvgIcon from "../../icons/SvgIcon";
import LoadingCard from "../../loading";

export default function PriceCard({ data }) {

    if (!data) {
        return <LoadingCard/>;
    }

    let price;
    let change;

    if (data && data.stats) {
        price  = data.stats.priceUsd;
        change = data.stats.priceChange.h24;
    } else {
        price  = <Loading type="points-opacity" css={{ ml: 10 }}/>
        change = <Loading type="points-opacity"  color="success"/>
    }

    return(
        <Card shadow={true}>
            <Card.Body css={{ pt: 18 }}>
                <Text size={12}>Price (USD)</Text>
                <Text size={18} b>${price}</Text>
            </Card.Body>
            <Card.Footer css={{ pt: 0 }}>
                { data && 
                <>
                    <SvgIcon icon={data.stats.priceChange.h24 < 0 ? "arrow-down" : "arrow-up"}
                        className={data.stats.priceChange.h24 < 0 ? "text-danger" : "text-success"}
                        size={16}
                        stroke={2}/>
                    <Text css={{ fontSize: 14 }} b className={data.stats.priceChange.h24 < 0 ? "text-danger" : "text-success"}>
                        {change}% 
                    </Text>
                    <Text css={{ ml: 5, fontSize:14 }}>change in 24h</Text>
                </>
                }

                {!data && 
                    <>
                        <Loading type="points-opacity"  color="success"/>
                        <Text css={{ ml: 5, fontSize:14 }}>change in 24h</Text>
                    </>}
            </Card.Footer>
        </Card>
    )
}