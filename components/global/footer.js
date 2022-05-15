import { Button, Card, Container, Grid, Link, Text } from "@nextui-org/react";
import BrandIcon from "../icons/BrandIcon";
import SvgIcon from "../icons/SvgIcon";

export default function Footer() {

    return (
        <>
        <Card css={{ br: 0, mt: 50 }}>
            <Card.Body css={{ pt: 40, pb: 20 }}>
                <Container gap={3}>
                    <Grid.Container alignItems="center" justify="space-between">
                        <Grid>
                            <Text size={30} b css={{ lh: 1 }}>BscTracker</Text>
                            <Text>
                                A better way to track your DeFi Wallet.
                            </Text>
                        </Grid>
                        <Grid>
                            <Grid.Container>
                                <Grid>
                                    <Link href="https://twitter.com/OG_KingFox" target="_blank" rel="nofollow noopener noreferrer">
                                        <Button auto light css={{ px: 10 }} color="primary">
                                            <BrandIcon 
                                                icon="twitter" 
                                                size={24} 
                                                stroke={2}/>
                                        </Button>
                                    </Link>
                                </Grid>
                                <Grid>
                                    <Link href="https://twitter.com/OG_KingFox" target="_blank" rel="nofollow noopener noreferrer">
                                        <Button auto light css={{ px: 10 }} color="primary">
                                            <BrandIcon 
                                                icon="discord" 
                                                size={24} 
                                                stroke={2}/>
                                        </Button>
                                    </Link>
                                </Grid>
                            </Grid.Container>
                        </Grid>
                    </Grid.Container>
                </Container>
            </Card.Body>
        </Card>
        <Card css={{ br: 0}}>
            <Card.Body css={{ pt: 0 }}>
                <Container>
                    <Grid.Container gap={2} alignItems="center" justify="space-between">
                        <Grid>
                            Copyright &copy; 2022 BscTracker | All Rights Reserved
                        </Grid>
                        <Grid>
                            <Text>
                                Want your token added? <a href="mailto:og.kingfox@gmail.com" rel="nofollow">Contact Me</a>
                            </Text>
                        </Grid>
                    </Grid.Container>
                   
                </Container>
            </Card.Body>
        </Card>
        </>
    )
}