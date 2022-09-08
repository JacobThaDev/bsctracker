import { useEffect, useState } from "react";
import { Badge, Card, Link, Table, Text } from "@nextui-org/react";
import axios from "axios";
import { useTracker } from "../../context/tracker";
import Functions from "../../helpers/Functions"
import SvgIcon from "../global/SvgIcon";

export default function TokenTx({ address }) {

    const [ txns, setTxns ]       = useState(null);
    const [ loading, setLoading ] = useState(false);
    const { tokens }              = useTracker();

    useEffect(() => {
        if (!tokens) {
            return;
        }
        
        async function getTxns() {
            setLoading(true);
            if (txns) {
                setTxns(null);
            }
            try {
                let txns = await axios.get("/api/wallet/txns/"+address)
                    .then(res => res.data);
                    
                let filtered = [];

                for (let i = 0; i < txns.length; i++) {
                    if (filtered.length >= 500) {
                        break;
                    }

                    let token = getToken(txns[i].contractAddress);

                    if (!token) {
                        continue;
                    }
                    
                    txns[i].index = i;
                    txns[i].value = txns[i].value / 10 ** txns[i].tokenDecimal;
                    txns[i].type  = txns[i].from.toLowerCase() == address.toLowerCase() ? "sell" : "buy";
                    filtered.push(txns[i]);
                }
                
                setTxns(filtered);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        }

        function getToken(address) {
            for (let i = 0; i < tokens.length; i++) {
                if (address.toLowerCase() == tokens[i].contract.toLowerCase()) {
                    return tokens[i];
                }
            }
            return null;
        }

        getTxns();
    }, [tokens, address]);

    if (!txns) {
        return null;
    }
    
    return(
        <Card variant="bordered" css={{ bg: "transparent", p: "1rem" }}>
            <Card.Header>
                <div>
                    <Text>Last 500 Transactions</Text>
                </div>
            </Card.Header>
            <Table sticked shadow={false}>
                <Table.Header>
                    <Table.Column>Token</Table.Column>
                    <Table.Column css={{ ta: "right" }}>Amount</Table.Column>
                    <Table.Column></Table.Column>
                </Table.Header>
                <Table.Body items={txns}>
                    {(item) => (
                        <Table.Row key={item.index}>
                            <Table.Cell>
                                <Text>
                                    <Badge 
                                        css={{ mr: 10, w: 50 }}
                                        color={item.type == "sell" ? "error" : "success"}>
                                        {item.type}
                                    </Badge>
                                    {item.tokenName}
                                </Text>
                            </Table.Cell>
                            <Table.Cell css={{ ta: "right" }}>
                                <Text>
                                    {Functions.shortenNumber(item.value, 4)}
                                </Text>
                            </Table.Cell>
                            <Table.Cell css={{ ta: "right" }}>
                                <Link 
                                    href={`https://bscscan.com/tx/${item.hash}`} 
                                    css={{ ml: "auto" }}
                                    target="_blank">
                                <SvgIcon icon="external-link" size={20}/>
                                </Link>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>

                <Table.Pagination css={{ mt: 10}}
                    noMargin
                    align="center" 
                    rowsPerPage={12} />
            </Table>
        </Card>
    )
}