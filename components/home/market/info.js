import {Grid, Image, Text, Link, Loading, Button} from "@nextui-org/react";
import { useTracker } from "../../../context/tracker";
import Functions from "../../../helpers/Functions";
import SvgIcon from "../../global/SvgIcon";
import toast from "react-hot-toast";

export default function MarketInfo() {

    const { 
        active, pairId, txnData
    } = useTracker();

    if (!active) {
        return null;
    }

    const copyText = () => {
        let res = Functions.copyText(active.contract);
        toast.success("Address copied!")
    }

    return(
        <>
            <Grid.Container alignItems="center" css={{ mb: 30 }}>
                <Grid>
                    <Image src={`/img/tokens/${active.symbol.toLowerCase()}.png`} css={{ height: 38}} />
                </Grid>
                <Grid css={{ ml: 5 }}>
                    { active.pairs.length > 0 &&
                    <Text size={13}>
                        {active.pairs[pairId].dexId} / {active.pairs[pairId].quoteToken.symbol.toLowerCase()}
                    </Text>}

                    { active.pairs.length === 0 &&
                        <Text size={13}>
                            wbnb
                        </Text>}
                    <Text size={24} b css={{ lh: 1 }}>
                        {active.title}
                    </Text>
                </Grid>
            </Grid.Container>

            <Text size={13}>
                Address:&nbsp;
                <Link href={`https://bscscan.com/token/${active.contract}`}
                      target="_blank"
                      icon
                      css={{ mr: 10 }}>
                    {Functions.shortenHash(active.contract)}
                </Link>
                <Button size={"xs"} css={{ d: "inline-block" }} light auto onPress={() => copyText(active.contract)}>
                    <Text size={12}>
                        <SvgIcon icon={"copy"} size={"12"} stroke={2}/>&nbsp;
                        Copy
                    </Text>
                </Button>
            </Text>

            <Text size={13}>
                Holders:&nbsp;
                { txnData ? Functions.formatNumber(txnData.receiver_count)
                    : "Loading..."}
            </Text>

            <Text size={13} css={{mb : 20 }}>Website:&nbsp;
                <Link href={active.website}
                      target="_blank" icon>
                    {active.website}
                </Link>
            </Text>
        </>
    )
}