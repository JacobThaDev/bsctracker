import { Container, Grid, Text } from "@nextui-org/react";

export default function PageHeader({ title, desc }) {

    return (
        <div className="header">
            <Container gap={2}>
                <Grid.Container gap={1} justify="space-between" alignItems="center">
                    <Grid>
                        <Text h3 css={{ mb: '0', letterSpacing: .5 }} color="white">
                            {title ? title : "BscTracker"}
                        </Text>
                        <Text css={{ mb: '0' }} color="white" size={14}>
                            {desc ? desc : "A better way to track your DeFi Wallet."}
                        </Text>
                    </Grid>
                </Grid.Container>
            </Container>
        </div>
    )
}