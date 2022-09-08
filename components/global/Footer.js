import GridContainer from "../grid/Container";
import GridRow from "../grid/Row";
import GridCol from "../grid/Column";
import { Text, Grid, Button, Link, Divider, Container } from "@nextui-org/react";
import BrandIcon from "./BrandIcon";

export default function Footer() {

    return(
        <div className="footer">
            <Container gap={1.5} md>

                <Grid.Container className="py-5" justify="space-between" alignItems="center">
                    <Grid>
                        <Text size={24} css={{ lh: 1.3 }}>
                            <span className="highlight">Bsc</span>Tracker
                        </Text>
                        <Text size={12} color="$gray800">
                            A complete modern approach to aid you in your DeFi journey.
                        </Text>
                    </Grid>
                    <Grid>
                        <Grid.Container justify="end" alignItems="center">
                            <Grid css={{ mr: 20 }}>
                                <Link href="https://twitter.com/OG_KingFox" target="_blank" rel="nofollow noopener" aria-label="Twitter">
                                    <Button auto light css={{ px: 0 }}>
                                        <BrandIcon icon="twitter" size={36}/>
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid css={{ mr: 20 }}>
                                <Link href="https://discord.com/invite/5BejZeDxWx" target="_blank" rel="nofollow noopener" aria-label="Discord">
                                    <Button auto light css={{ px: 0 }}>
                                        <BrandIcon icon="discord" size={36}/>
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid>
                                <Link href="https://github.com/OGKingFox/bsctracker" target="_blank" rel="nofollow noopener" aria-label="Github">
                                    <Button auto light css={{ px: 0 }}>
                                        <BrandIcon icon="github" size={30}/>
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid.Container>
                    </Grid>
                </Grid.Container>

                <Grid.Container className="mt-4 mb-5">
                    <Grid xs={6} sm={3}>
                        <div>
                            <Text css={{ mb: 20 }} size={18}>Exchanges</Text>
                            <ul className="footer-links">
                                <li>
                                    <Link href=""
                                        target="_blank" rel="nofollow noopener">
                                        <Text size={14}>BitMart</Text>
                                    </Link>
                                </li>
                                <li>
                                    <Link href=""
                                        target="_blank" rel="nofollow noopener">
                                        <Text size={14}>Mandala</Text>
                                    </Link>
                                </li>
                                <li>
                                    <Link href=""
                                        target="_blank" rel="nofollow noopener">
                                        <Text size={14}>WhiteBit</Text>
                                    </Link>
                                </li>
                                <li>
                                    <Link href=""
                                        target="_blank" rel="nofollow noopener">
                                        <Text size={14}>BitForex</Text>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </Grid>
                    <Grid xs={6} sm={3}>
                        <div>
                            <Text css={{ mb: 20 }} size={18}>Swaps</Text>
                            <ul className="footer-links">
                                <li>
                                    <Link href="https://swap.safemoon.com/#/swap"
                                        target="_blank" rel="nofollow noopener">
                                        <Text size={14}>SafeSwap</Text>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://pancakeswap.com/swap"
                                        target="_blank" rel="nofollow noopener">
                                        <Text size={14}>PancakeSwap</Text>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://app.uniswap.org/#/swap?chain=mainnet"
                                        target="_blank" rel="nofollow noopener">
                                        <Text size={14}>UniSwap</Text>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://app.radioshack.org/swap"
                                        target="_blank" rel="nofollow noopener">
                                        <Text size={14}>RadioShack</Text>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </Grid>
                    <Grid xs={6} sm={3}>
                        <div>
                            <Text css={{ mb: 20 }} size={18}>Resources</Text>
                            <ul className="footer-links">
                                <li>
                                    <Link href="https://bscscan.com"
                                            target="_blank" rel="nofollow noopener">
                                        <Text size={14}>BscScan</Text>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://www.adapt.exchange/"
                                            target="_blank" rel="nofollow noopener">
                                        <Text size={14}>Adapt.Exchange</Text>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://explorenft.app/"
                                            target="_blank" rel="nofollow noopener">
                                        <Text size={14}>ExploreNFT</Text>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://watcher.guru/news/?c=1"
                                            target="_blank" rel="nofollow noopener">
                                        <Text size={14}>Watcher.Guru</Text>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </Grid>
                    <Grid xs={6} sm={3}>
                        <div>
                            <Text css={{ mb: 20 }} size={18}>Legal</Text>
                            <ul className="footer-links">
                                <li>
                                    <Link href="/legal/terms">
                                        <Text size={14}>Terms of Use</Text>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/legal/privacy">
                                        <Text size={14}>Privacy Policy</Text>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/legal/cookies">
                                        <Text size={14}>Cookies Policy</Text>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/legal/disclaimer">
                                        <Text size={14}>Disclaimer</Text>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </Grid>
                </Grid.Container>

                <Divider />

                <Grid.Container className="py-5">
                    <Grid xs>
                        <Text size={14}>
                            &copy; 2022 BscTracker | All Rights Reserved
                        </Text>
                    </Grid>
                </Grid.Container>
            </Container>
        </div>
    )
}
