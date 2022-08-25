import {
    Button,
    Card,
    Divider,
    Grid,
    Image,
    Loading,
    Modal,
    Table,
    Text,
    Tooltip,
    useAsyncList, useCollator,
    useModal
} from "@nextui-org/react";
import Functions from "../../helpers/Functions";
import SvgIcon from "../global/SvgIcon";
import {useEffect, useState} from "react";
import Token from "../../helpers/Token";
import Wallet from "../../helpers/Wallet";

export default function TokenList({ tokens, address, changeToken, setTotalValue }) {

    const { setVisible, bindings } = useModal();
    const [ wallets, setWallets ]  = useState(null);

    useEffect(() => {
        if (!tokens) {
            return;
        }

        update();
    }, [tokens]);

    const update = () => {
        let balanceArr = [];
        let priceArr   = [];
        let tokenCopy  = tokens.map((x) => x);
        let total      = 0;

        for (let i = 0; i < tokenCopy.length; i++) {
            let token  = new Token(tokenCopy[i].contract, tokenCopy[i].primaryPool);
            let wallet = new Wallet(tokenCopy[i].contract, address);

            balanceArr.push(wallet.getBalance());
            priceArr.push(token.getPrice());
        }

        // don't ask...
        Promise.all(balanceArr).then((balances) => {
            Promise.all(priceArr).then(async(prices) => {

                for (let i = 0; i < balances.length; i++) {
                    let totalVal = parseFloat((balances[i] * prices[i]).toFixed(2));

                    tokenCopy[i].wallet = {
                        balance: balances[i],
                        price: prices[i],
                        total_value: Functions.formatNumber(totalVal, 2)
                    }

                    total += totalVal;
                }

                await tokenCopy.sort((a, b) => {
                    let first  = a.wallet.total_value;
                    let second = b.wallet.total_value;
                    return (second - first);
                });

                setWallets(tokenCopy);
                setTotalValue(total);
            });
        });
    }

    return(
        <Card variant={""} css={{ mb: 20, p: "1rem" }}>
            <Card.Header>
                <div>
                    <Text size={20}>Token Allocation</Text>
                    <Text size={12} color={"$gray800"}>Select a token to view full details.</Text>
                </div>
            </Card.Header>

            <Divider css={{ my: 10 }}/>

            { !wallets &&
            <Card.Body>
                Loading balances...
            </Card.Body>}

            { wallets &&
            <Table aria-label={"table"}
                   shadow={false}
                   css={{ p:0 }}
                   selectionMode={"single"}
                   onSelectionChange={changeToken}>
                <Table.Header>
                    <Table.Column>Title</Table.Column>
                    <Table.Column>Balance</Table.Column>
                    <Table.Column>Value</Table.Column>
                </Table.Header>
                <Table.Body items={wallets}>
                    {(item) => (
                        <Table.Row key={item.contract} css={{ opacity: item.wallet && item.wallet.balance > 0 ? 1 : 0.5 }}>

                            <Table.Cell>
                                <Grid.Container alignItems={"center"}>
                                    <Grid css={{ pr: 10 }}>
                                        <Image src={"/img/tokens/"+item.symbol.toLowerCase()+".png"}
                                               style={{ width: 18 }}/>
                                    </Grid>
                                    <Grid className={"d-none d-lg-inline-block"}>
                                        <Text size={14}>{item.symbol}</Text>
                                    </Grid>
                                </Grid.Container>

                            </Table.Cell>
                            <Table.Cell >
                                <Text size={14}>
                                { item.wallet ? Functions.shortenNumber(item.wallet.balance, 4) : 0 }
                                </Text>
                            </Table.Cell>
                            <Table.Cell>
                                <Text size={14}>${ item.wallet ? item.wallet.total_value : 0 }</Text>
                                <Text size={12} color={"$gray800"}>@ { item.wallet ? Functions.formatNumber(item.wallet.price, 9) : 0 }</Text>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
                <Table.Pagination noMargin align="center" rowsPerPage={10} />
            </Table> }
            <Card.Footer css={{ pt: 20 }}>
                <Text size={12} color={"$gray800"}>
                    All prices here are calculated real-time from either SafeSwap, or PancakeSwap using WBNB pairs.
                </Text>
            </Card.Footer>
        </Card>
    )
}