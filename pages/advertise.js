import { Card, Container, Text, Grid, Image, Link, Button, Tooltip, Badge } from "@nextui-org/react";
import BrandIcon from "../components/global/BrandIcon";
import Footer from "../components/global/Footer";
import PageNav from "../components/global/PageNav";
import SvgIcon from "../components/global/SvgIcon";
import Layout from "../components/Layout";

export default function Advertise() {
    
    return(
        <Layout title="Advertise" desc="Want to increase your exposure? Advertise your token on our website for 30 days!"> 
            <PageNav/>

            <Container css={{ my: 100 }} gap={2} md>
                <Text color="primary">Advertise</Text>
                <Text size={40} b>
                    Want to increase your exposure?
                </Text>
                <Text css={{ mb: 30 }}>
                    Everything you need to know and what we offer for advertising.
                </Text>

                <Text css={{ mb: 20 }}>
                    We're currently reaching about 110K+ requests and over 1,200 unique visitors per month. Generally,
                    websites will charge you about $1 per unique visitor per 30 days, also dependant on availability. To start
                    out, we're offering a slot at just $0.50 per unique visitor, making it $600 per month for our top slot.
                </Text>

                <Text b>What do you get for $600/month?</Text>
                <Text css={{ mb: 20 }}>
                    You'll get our premium ad spot for 30 days, which is at the top of the homepage visible immediately when coming
                    to this website, giving maximum exposure. It will be a text ad, with your logo, website link, and social
                    media link if chosen.
                </Text>

                <Text>Example Ad:</Text>
                
                <Card variant="bordered" css={{ bg: "transparent", my: 30, p: "1rem" }}>
                    <Card.Header>
                        <Text color="primary" small>Sponsored</Text>
                    </Card.Header>
                    <Card.Body>
                        <Grid.Container>
                            <Grid css={{ mr: 20, mb: 20 }}>
                                <Image 
                                    src="/img/tokens/sfm.png" 
                                    css={{ mt: 5 }}
                                    width={60}/>
                            </Grid>
                            <Grid>
                                <div>
                                    <Text size={20}>SafeMoon</Text>
                                    <Text css={{ mb: 30 }}>
                                        The SafeMoon Protocol V2 is a community focused DeFi token that 
                                        forms part of the expanding SafeMoon ecosystem.
                                    </Text>

                                    <Grid.Container>
                                        <Tooltip content="Website" placement="bottom">
                                            <Link href="#" auto css={{ mr: 10 }}>
                                                <SvgIcon icon="globe" size={26} stroke={1.5} />
                                            </Link>
                                        </Tooltip>
                                        <Tooltip content="Charts" placement="bottom">
                                            <Link href="#" auto css={{ mr: 10 }}>
                                                <SvgIcon icon="bar-chart-2" size={26} stroke={2} />
                                            </Link>
                                        </Tooltip>
                                        <Tooltip content="Twitter" placement="bottom">
                                            <Link href="#" auto css={{ mr: 10 }}>
                                                <BrandIcon icon="twitter" size={26} />
                                            </Link>
                                        </Tooltip>
                                        <Tooltip content="Discord" placement="bottom">
                                            <Link href="#" auto css={{ mr: 10 }}>
                                                <BrandIcon icon="discord" size={26} />
                                            </Link>
                                        </Tooltip>
                                        <Tooltip content="Telegram" placement="bottom">
                                            <Link href="#" auto css={{ mr: 10 }}>
                                                <BrandIcon icon="telegram" size={26} />
                                            </Link>
                                        </Tooltip>
                                    </Grid.Container>
                                </div>
                            </Grid>
                        </Grid.Container>
                    </Card.Body>
                </Card>

                <Text b>What is not allowed?</Text>
                <Text css={{ mb: 20 }}>
                    Our slot is reserved for only the most professional tokens, meaning we don't allow "Next 1000X Gem" type
                    of advertising, as it lacks that level of professionalism we expect. Here's all that is prohibited:
                </Text>
                
                <ul style={{ marginBottom: 30 }}>
                    <li>&bull; Pornography related tokens</li>
                    <li>&bull; Mixer tokens (tokens or coins like Tornado Cash)</li>
                    <li>&bull; Slandering or defaming another project to boost your own (this includes on your social media and/or website)</li>
                    <li>&bull; Racial or otherwise derogatory slurs are prohibited</li>
                    <li>&bull; Tokens targeting minors or inexperienced traders</li>
                    <li>&bull; Tokens offering insanely high dividends (this usually indicates a scam, and in reality is much lower)</li>
                    <li>&bull; Tokens offering insanely high price increases (i.e. "Next 1000X Gem").</li>
                    <li>&bull; Misleading advertising</li>
                </ul>

                <Text css={{ mb: 20 }}>
                    Everything else is solely at my discretion.
                </Text>

                <Text size={20}>Ready to start advertising?</Text>
                <Text>Send me an email with your token information, what you're about, etc. and we'll get back to you within 72 hours.</Text>
                <Link href="mailto:bsctracker.net@gmail.com">Contact Me!</Link>
            </Container>

            <Footer/>
        </Layout>
    )

}