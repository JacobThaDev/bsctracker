import { Text, Link, Image, Grid, Tooltip } from "@nextui-org/react";
import SvgIcon from "./SvgIcon";

const tokens = require("../../tokens")

export default function Sidebar() {

    const getList = () => {
        let list = [];
        let keys = Object.keys(tokens);
        
        for (let i = 0; i < keys.length; i++) {
            let token = tokens[keys[i]];

            list.push(
                <Link href={`/tokens/${keys[i]}`} className="sidebar-link" key={i}>
                    <Grid.Container alignItems="center">
                        <Grid css={{ pr: 10 }}>
                            <Image src={`/img/tokens/${keys[i]}.png`} width={24}/>
                        </Grid>
                        <Grid xs> 
                            <Text css={{ lh: 1 }}>{token.title}</Text>
                        </Grid>
                        <Grid>
                            <Text css={{ lh: 0 }}>
                                <SvgIcon icon="chevron-right" size={18} />
                            </Text>
                        </Grid>
                    </Grid.Container>
                </Link>
            )
        }

        return list;
    }

    return (
        <Grid className="sidebar">
            <Text css={{ ta: "center", lh: 1 }}>
                <SvgIcon icon="bar-chart-2" size={30} stroke={3} />
            </Text>
            <Text size={20} css={{ ta: "center", mb: 20, fontWeight: 700 }}>
                BscTracker
            </Text>

            <Text size={14} css={{ my: 10 }} color="$gray800">
                Dashboard
            </Text>

            <Link href="" className="sidebar-link">
                <Grid.Container alignItems="center">
                    <Grid xs> 
                        <Text css={{ lh: 1 }}>Home</Text>
                    </Grid>
                    <Grid>
                        <Text css={{ lh: 0 }}>
                            <SvgIcon icon="chevron-right" size={18} />
                        </Text>
                    </Grid>
                </Grid.Container>
            </Link>

            <Link href="" className="sidebar-link">
                <Grid.Container alignItems="center">
                    <Grid xs> 
                        <Text css={{ lh: 1 }} color="success">
                            Buy me a Coffee
                        </Text>
                    </Grid>
                    <Grid>
                        <Text css={{ lh: 0 }} color="success">
                            <SvgIcon icon="chevron-right" size={18} />
                        </Text>
                    </Grid>
                </Grid.Container>
            </Link>

            <Link href="" className="sidebar-link">
                <Grid.Container alignItems="center">
                    <Grid xs> 
                        <Text css={{ lh: 1 }}>Wallet Tracker</Text>
                    </Grid>
                    <Grid>
                        <Text css={{ lh: 0 }}>
                            <SvgIcon icon="chevron-right" size={18} />
                        </Text>
                    </Grid>
                </Grid.Container>
            </Link>

            <Text size={14} css={{ mb: 10, mt: 20 }} color="$gray800">
                Tokens
            </Text>

            {getList()}
        </Grid>
    )
}