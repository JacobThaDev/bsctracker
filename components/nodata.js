import { Grid, Text, Link, Button } from "@nextui-org/react";
import SvgIcon from "./icons/SvgIcon";


export default function NoData() {

    return(
        <Grid.Container alignItems="center" justify="center" className="full-height">
            <Grid css={{ textAlign: "center"}}>
                <Text color="error">
                    <SvgIcon icon="frown" stroke={2} size={86}/>
                </Text>
                
                <Text h3 b>Error</Text>

                <Text>There is no data for this token/pair. This could imply that this
                    token has no trading volume.
                </Text>

                <Text css={{ mb: 50 }}>
                    Please DYOR before making assumptions. Ty!
                </Text>

                <Link href="/">
                    <Button color="error">
                        Return Home
                    </Button>
                </Link>
            </Grid>
        </Grid.Container>
    )
}