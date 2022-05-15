import { useTheme as useNextTheme } from 'next-themes'
import { Button, Container, Grid, useTheme, Text, Modal } from "@nextui-org/react";
import SvgIcon from '../icons/SvgIcon';
import Link from "next/link";
import KofiButton from './kofibutton';

export default function Navbar() {

    const { setTheme } = useNextTheme();
    const { isDark, type } = useTheme();

    const changeTheme = (e) => {
        setTheme(type == "light" ? 'dark' : 'light')
    }

    return(
        <div className="nav-container">
            <Container>
                <Grid.Container gap={0} justify="space-between" alignItems='center'>
                    <Grid>
                        <Grid.Container gap={1}>
                            <Grid>
                                <a className="nav-link" href="/">
                                    Home
                                </a>
                            </Grid>
                            <Grid>
                                <Link href="/track">
                                    <a className="nav-link">
                                        Wallet Tracker
                                    </a>
                                </Link>
                            </Grid>
                        </Grid.Container>
                    </Grid>
                    <Grid>
                        <Grid.Container alignItems="center" gap={1}>
                            <Grid>
                                <KofiButton/>
                            </Grid>
                            <Grid>
                                <Button auto light onClick={changeTheme} css={{ px: 5 }}>
                                    <Text color="white" css={{ pt: 10 }}>
                                        { type == "dark" 
                                            ? <SvgIcon icon="sun" size={18} stroke={2} />
                                            : <SvgIcon icon="moon" size={18} stroke={2}/>
                                        }
                                    </Text>
                                </Button>
                            </Grid>
                        </Grid.Container>
                    </Grid>
                </Grid.Container>
            </Container>
        </div>
    )
}