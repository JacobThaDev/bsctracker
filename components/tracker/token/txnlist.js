import {Badge, Card, Table, Text} from "@nextui-org/react";
import SvgIcon from "../../global/SvgIcon";
import Functions from "../../../helpers/Functions";
import Link from "next/link";

export default function TxnList({ token, txnList, address }) {

    if (!txnList || txnList.length === 0) {
        return null;
    }

    function getList() {
        let list = [];

        for (let i = 0; i < txnList.length; i++) {
            if (txnList[i].contractAddress.toLowerCase() !== token.contract.toLowerCase()) {
                continue;
            }

            txnList[i].key = i;
            list.push(txnList[i]);
        }

        return list;
    }

    function getColor(from, to) {
        if (from.toLowerCase() === to.toLowerCase()) {
            return "warning";
        } else if (from.toLowerCase() === address.toLowerCase()) {
            return "error";
        } else if (to.toLowerCase() === address.toLowerCase()) {
            return "success";
        }
    }

    function getIcon(from, to) {
        if (from.toLowerCase() === to.toLowerCase()) {
            return <SvgIcon
                stroke={2}
                icon={"arrow-right-circle"}
                size={18} />;
        } else if (from.toLowerCase() === address.toLowerCase()) {
            return <SvgIcon
                stroke={2}
                icon={"arrow-up-circle"}
                size={18} />;
        } else if (to.toLowerCase() === address.toLowerCase()) {
            return <SvgIcon
                stroke={2}
                icon={"arrow-down-circle"}
                size={18} />;
        }
    }

    return(
        <Card css={{ p: "1rem", mb: 20, bg: "transparent" }} variant={"bordered"}>
            <Card.Header>
                Transactions
            </Card.Header>
            <Table shadow={false} sticked>
                <Table.Header>
                    <Table.Column>Type</Table.Column>
                    <Table.Column>Amount</Table.Column>
                    <Table.Column>Hash</Table.Column>
                    <Table.Column>Time</Table.Column>
                </Table.Header>
                <Table.Body items={getList()}>
                    {(item) => (
                        <Table.Row key={item.key}>
                            <Table.Cell>
                                <Badge 
                                    color={getColor(item.from, item.to)} 
                                    css={{ lh: 1, width: 40 }}>
                                    {item.to.toLowerCase() === address.toLowerCase() ? "In" : "Out"}
                                </Badge>
                            </Table.Cell>
                            <Table.Cell>
                                {Functions.formatNumber(item.value / 10 ** item.tokenDecimal, 3)}&nbsp;
                                <Text small color={"$gray800"}>
                                    {item.tokenSymbol}
                                </Text>
                            </Table.Cell>
                            <Table.Cell>
                                <Link href={"https://bscscan.com/tx/"+item.hash}>
                                    <a target={"_blank"}>
                                        {Functions.shortenHash(item.hash)}
                                    </a>
                                </Link>
                            </Table.Cell>
                            <Table.Cell>
                                {new Date(item.timeStamp * 1000).toLocaleDateString()}
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
                <Table.Pagination
                    noMargin
                    align="center"
                    rowsPerPage={10}
                    onPageChange={(page) => console.log({ page })}
                />
            </Table>
        </Card>
    )
}