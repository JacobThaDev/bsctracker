import { Avatar, Button, Grid, Image, User } from "@nextui-org/react";
import Link from "next/link";

export default function TokenButton({ symbol, active }) {

    return(
        <Link href={"/"+symbol}>
            <Avatar src={`/img/tokens/${symbol.toLowerCase()}.png`}
                size="md"
                bordered 
                stacked
                icon
                color={active == symbol ? "gradient" : ""} 
                borderWeight={"bold"}/>
        </Link>
    )
}