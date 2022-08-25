import {Card, Grid, Loading, Text} from "@nextui-org/react";
import { useTracker } from "../../../context/tracker";
import Functions from "../../../helpers/Functions";
import SvgIcon from "../../global/SvgIcon";

export default function MarketSupply() {

    const { circulating, burned } = useTracker();

    return(
        <Card variant="" className="inner-card">
            <Card.Header>
                <Grid.Container alignItems="center">
                    <Grid css={{ mr: 5 }}>
                        <Text color="$primary">
                            <SvgIcon icon="info" size={11} stroke={3} />
                        </Text>
                    </Grid>
                    <Grid>
                        <Text size={11} color="$gray800">
                            Supply
                        </Text>
                    </Grid>
                </Grid.Container>
            </Card.Header>
            <Card.Body css={{ pt: 0, pb: 10 }}>
                <Text size={14}>
                    {circulating ? Functions.shortenNumber(circulating)
                        : "..."}
                </Text>
                <Text size={11} color={"$gray800"}>
                    Burned {Functions.shortenNumber(burned)}
                </Text>
            </Card.Body>
        </Card>
    )
}