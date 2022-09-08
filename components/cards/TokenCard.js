import { Badge, Card, Text } from "@nextui-org/react"
import { useState, useEffect } from "react";
import Token from "../../helpers/Token";
import Functions from "../../helpers/Functions";

export default function TokenCard({ token }) {

    return(
        <Card variant="" css={{ p: "1rem" }}>
            <Card.Header>
                {token.title}
            </Card.Header>
            <Card.Body css={{ py: 0 }}>
                <Text size={24}>
                    ${token.pairs.length > 0 
                        ? Functions.shortenPrice(token.pairs[0].priceUsd)
                        : 0 }
                    <Badge color={token.pairs[0].priceChange.h24 < 0 ? "error" : "success"}>
                        {token.pairs[0].priceChange.h24 > 0 && <>+&nbsp;</>}
                        {token.pairs[0].priceChange.h24}%
                    </Badge>
                </Text>

                
                <Text>
                    {token.pairs.length > 0 }
                </Text>
            </Card.Body>
        </Card>
    )
}