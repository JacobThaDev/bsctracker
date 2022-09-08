import Layout from "../components/Layout";
import PageNav from "../components/global/PageNav";
import Footer from "../components/global/Footer";
import { useTracker } from "../context/tracker";

import { Text, Container, Card, Grid, Link, Button } from "@nextui-org/react";
import TokenTable from "../components/cards/TokenTable";
import Leaderboard from "../components/cards/Leaderboard";

export default function Homepage() {

    const { tokens, active } = useTracker();

    return(
        <Layout>
            <PageNav/>

            <Container css={{ mt: 100 }} md>
                <div style={{ maxWidth: 700 }}>
                    <Text color="primary" css={{ mb: 10 }}>
                        Welcome to BscTracker
                    </Text>
                    <Text size={40} b>
                        Keep track of all your favorite tokens on the
                        Binance Network.
                    </Text>
                </div>
            </Container>

            <Container css={{ mt: 70 }} md>
                <Card variant="bordered" css={{ bg:"transparent", p: "1rem"}}>
                    <Card.Body>
                        <Grid.Container alignItems="center">
                            <Grid css={{ pr: 10 }}>
                                <Text>
                                    Want to advertise here?  
                                </Text>
                            </Grid>
                            <Grid>
                                <Grid.Container>
                                    <Grid>
                                        <Link href="/advertise">Learn more</Link>
                                    </Grid>
                                </Grid.Container>
                            </Grid>
                        </Grid.Container>
                    </Card.Body>
                </Card>
            </Container>

            { tokens && 
            <Container css={{ mt: 70 }} md>
                <Grid.Container>
                    <Grid xs={12} sm={8} className="token-table">
                        <TokenTable />
                    </Grid>
                    <Grid xs={12} sm={4}>
                        <div style={{ width: "100%" }}>
                            <div style={{ marginBottom: 40 }}>
                                <Leaderboard
                                    tokens={tokens}
                                    sorting={"desc"} />
                            </div>
                            <div>
                                <Leaderboard
                                    tokens={tokens}
                                    sorting={"asc"} />
                            </div>
                        </div>
                    </Grid>
                </Grid.Container>
            </Container>
            }

            <Container css={{ my: 50 }} md>
                <Card css={{ p: "2rem"}}>
                    <Card.Body>
                        <Grid.Container justify="space-between" alignItems="center">
                            <Grid>
                                <Text size={20} b>Want your token added?</Text>
                                <Text>
                                    Contact me on either discord or by email with your token information to have it added!
                                </Text>
                            </Grid>
                            <Grid>
                                <Grid.Container>
                                    <Grid css={{ pr: 10 }}>
                                        <Link href="mailto://og.kingfox@gmail.com" target="_blank">
                                            <Button auto size="lg" rounded>
                                                Email
                                            </Button>
                                        </Link>
                                    </Grid>
                                    <Grid>
                                        <Link href="https://discord.com/users/150486701695827968" target="_blank">
                                            <Button auto size="lg" rounded> 
                                                Discord
                                            </Button>
                                        </Link>
                                    </Grid>
                                </Grid.Container>
                            </Grid>
                        </Grid.Container>
                    </Card.Body>
                </Card>
            </Container>

            <Footer/>
        </Layout>
    )
}