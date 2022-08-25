import {Card, Divider, Grid, Image, Progress, Text, Link, Button, Loading, Dropdown} from "@nextui-org/react";
import TokenModal from "../TokenModal";
import {useTracker} from "../../../context/tracker";
import SvgIcon from "../../global/SvgIcon";


export default function MarketHeader() {

    const { active, getTimeName, setTime, refreshData } = useTracker();

    const refresh = () => {
        let icon = document.getElementById("refresh");
        icon.classList.add("spinnyboi");
        refreshData().then(() => icon.classList.remove("spinnyboi"));
    }

    return(
        <Card.Header>
            <Grid.Container alignItems="center" justify="space-between">
                <Grid>
                    <Text>Market Stats</Text>
                </Grid>
                <Grid>
                    <Grid.Container>
                        <Grid css={{ pr : 10 }}>
                            <Button auto light bordered color={"success"} rounded onPress={refresh}>
                                <SvgIcon icon={"refresh-cw"} size={12} stroke={3} id={"refresh"}/>
                            </Button>
                        </Grid>
                        <Grid css={{ pr : 10 }}>
                            <Dropdown>
                                <Dropdown.Button rounded>
                                    <SvgIcon icon={"clock"} size={16} stroke={2}/>&nbsp;{getTimeName()}
                                </Dropdown.Button>
                                <Dropdown.Menu
                                    aria-label="Static Actions"
                                    selectionMode={"single"}
                                    onSelectionChange={(key) => setTime(key.currentKey)}>
                                    <Dropdown.Item key="h24">
                                        24 hrs
                                    </Dropdown.Item>
                                    <Dropdown.Item key="h6">
                                        6 hrs
                                    </Dropdown.Item>
                                    <Dropdown.Item key="h1">
                                        1 hr
                                    </Dropdown.Item>
                                    <Dropdown.Item key="m5">
                                        5 min
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Grid>
                        <Grid>
                            <TokenModal/>
                        </Grid>
                    </Grid.Container>

                </Grid>
            </Grid.Container>
        </Card.Header>
    )
}