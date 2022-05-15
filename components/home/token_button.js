import { Button, Grid, Image } from "@nextui-org/react";
import Link from "next/link";

export default function TokenButton({ symbol }) {

    return(
        <Link href={"/"+symbol}>
            <Button light css={{ px: 5 }}>
                <Image src={`/img/tokens/${symbol.toLowerCase()}.png`}
                    width={28} height={28}/>
            </Button>
        </Link>
    )
}