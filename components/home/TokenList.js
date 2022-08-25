import {Table, Image, Text, useCollator, Grid, useAsyncList, useListData, Modal} from "@nextui-org/react";
import { useTracker } from "../../context/tracker";
import Functions from "../../helpers/Functions";
import SvgIcon from "../global/SvgIcon";
import {useState} from "react";
import { useRouter } from "next/router"

export default function TokenList({ closeHandler }) {
    
    const { setActive, tokens, pairs } = useTracker();
    const router = useRouter();

    const changeToken = (key) => {
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].contract.toLowerCase() === key.currentKey.toLowerCase()) {
                setActive(tokens[i]);
                router.push("/token/"+tokens[i].symbol.toLowerCase());
                break;
            }
        }

        closeHandler();
        window.scrollTo(0, 0);
    }

    const collator = useCollator({
        numeric: true
    });

    async function sort({ items, sortDescriptor }) {
        return {
            items: items.sort((a, b) => {
                let first, second;
                let column = sortDescriptor.column;

                if (column == "price") {
                    first   = a.pairs[0].priceChange.h24;
                    second  = b.pairs[0].priceChange.h24;
                } else if (column == "volume") {
                    first   = a.pairs[0].volume.h24;
                    second  = b.pairs[0].volume.h24;
                }

                return sortDescriptor.direction === "descending" ? (second - first) : (first - second);
            }),
        };
    }

    async function load({ signal, cursor }) {
        return {
            items: tokens
        };
    }

    const list = useAsyncList({ load, sort });

    return(
        <>
        <Table 
            shadow={false}
            onSelectionChange={(key) => changeToken(key)}
            aria-label="Token List"
            css={{ height: 500, mb: 0, pb: 0 }}
            onSortChange={list.sort}
            sortDescriptor={list.sortDescriptor}
            selectionMode="single">
            <Table.Header>
                <Table.Column key="icon" css={{ width: 50 }}></Table.Column>
                <Table.Column key="title">Title</Table.Column>
                <Table.Column key="volume" allowsSorting>Vol. 24h</Table.Column>
                <Table.Column key="price" allowsSorting>Trend 24h</Table.Column>
            </Table.Header>
            <Table.Body
                items={list.items}
                loadingState={list.loadingState}
                onLoadMore={list.loadMore}>
                {(item) => (

                    <Table.Row key={item.contract}>
                        <Table.Cell css={{ width: 50 }}>
                            <Image src={"/img/tokens/"+item.symbol.toLowerCase()+".png"} width={20}/>
                        </Table.Cell>
                        <Table.Cell>
                            <Text css={{ lh: 1 }} size={13}>
                                {item.title}
                            </Text>
                        </Table.Cell>
                        <Table.Cell>
                            <Text color="$gray800" size={13}>
                                ${item.pairs.length > 0
                                    ? Functions.formatNumber(item.pairs[0].volume.h24, 2)
                                    : 0}
                            </Text>
                        </Table.Cell>
                        <Table.Cell>
                            <Text color={item.pairs.length > 0 && item.pairs[0].priceChange.h24 < 0 ? "error" : "success"} size={13}>
                                {item.pairs.length > 0
                                    ? Functions.formatNumber(item.pairs[0].priceChange.h24, 2)
                                    : 0}%
                            </Text>
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
        </>
    )
}