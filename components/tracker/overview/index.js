import {Card, Divider, Grid, Text} from "@nextui-org/react";
import {useRouter} from "next/router";
import Functions from "../../../helpers/Functions";
import SvgIcon from "../../global/SvgIcon";

export default function Overview({ address, value, lastUpdate }) {

    if (!address) {
        return null;
    }

    return(
        <Card variant="" css={{ padding: "1rem", mb: 20 }}>
            <Card.Header>
                <Grid.Container justify={"space-between"}>
                    <Grid>
                        <Text size={20}>Portfolio</Text>
                        <Text size={12} color={"$gray700"}>Last Updated {new Date(lastUpdate).toLocaleTimeString()}</Text>
                    </Grid>
                    <Grid>
                        {Functions.shortenAddress(address, 8)}
                    </Grid>
                </Grid.Container>
            </Card.Header>

            <Card.Body>

                <div className={"row"}>
                    <div className={"col-12 col-lg-4"}>
                        <Card variant={""} className={"inner-card"}>
                            <Card.Header>
                                <Text size={11} color="$gray800">
                                    Value (est.)
                                </Text>
                            </Card.Header>

                            <Card.Body css={{ pt: 0, pb: 10 }}>
                                <Text size={24} b>
                                    ${Functions.formatNumber(value, 2)}
                                </Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );

}