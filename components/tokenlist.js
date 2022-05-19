import { Avatar, Button, Card, Grid, Text } from "@nextui-org/react";
import StatsLoader from "./home/stats/loader";
import TokenButton from "./home/token_button";
import SvgIcon from "./icons/SvgIcon";

const tokens  = require("../tokens");

export default function TokenList({ active, data, reloadHandler, isLoading }) {

    return (
        <Card shadow={true}>
            <Card.Body>
                <Grid.Container alignItems="center" justify="space-between">
                    <Grid>
                        <Avatar.Group>
                            {Object.keys(tokens).map((s, index) => {
                                return(
                                    <TokenButton 
                                        symbol={s} 
                                        key={index}
                                        active={active}  /> 
                                )
                            })}
                            </Avatar.Group>
                    </Grid>
                    <Grid>
                        <Button 
                            rounded 
                            color="success"
                            disabled={isLoading}
                            auto 
                            size={"sm"} 
                            onClick={() => reloadHandler()}>
                            <SvgIcon 
                                icon="repeat" 
                                size={15} 
                                stroke={2}/> 
                            <Text color="white" css={{ pl: 15}}>Refresh</Text>
                        </Button>
                    </Grid>
                </Grid.Container>
                
            </Card.Body>
            <StatsLoader data={data}/>
        </Card>)
}