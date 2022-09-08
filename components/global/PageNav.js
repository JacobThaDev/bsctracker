import { 
    Navbar, Link, Container, Row, Text, Input, Button, Image 
} from "@nextui-org/react";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Functions from "../../helpers/Functions";
import toast from 'react-hot-toast';
import Binance, { getBnbPrice } from "../../helpers/Binance";

import { useTheme as useNextTheme } from 'next-themes'
import { Switch, useTheme } from '@nextui-org/react'
import SvgIcon from "./SvgIcon";

export default function PageNav() {

    const { setTheme } = useNextTheme();
    const { isDark, type } = useTheme();

    const links = [
        {
            title: "Home",
            link: "/",
            color: "inherit"
        },
        {
            title: "About",
            link: "/about",
            color: "inherit"
        },
        {
            title: "Advertise",
            link: "/advertise"
        },
        {
            title: "Donate",
            link: "/donate",
            color: "success"
        }
    ];

    const [ bnbPrice, setBnbPrice ] = useState(null);
    const router = useRouter();

    const submit = (e) => {
        e.preventDefault();

        let data    = new FormData(e.target);
        let address = data.get("address");

        if (!Functions.validateAddress(address)) {
            toast.error("Invalid wallet address");
        } else {
            router.push("/track/"+address);
        }
    }

    const changeTheme = () => {

    }

    useEffect(() => {
        async function getBnbPrice() {
            let price = await Binance.getBnbPrice();
            setBnbPrice(price);
        }

        getBnbPrice();
    }, []);

    return(
        <Navbar 
            height={105} 
            disableShadow maxWidth="md" 
            variant="sticky" 
            css={{ zIndex: 1000 }}>
            <Navbar.Brand>
                <Navbar.Toggle 
                    aria-label="toggle navigation" 
                    showIn={"sm"} 
                    css={{ mr: 20 }} />
                <Text h3 css={{ mb: 0 }}>
                    <span>Bsc</span>Tracker
                </Text>
            </Navbar.Brand>

            <Navbar.Content enableCursorHighlight hideIn="sm">
                {links.map((item, index) => (
                    <Navbar.Link href={item.link} key={index} color={item.color}>
                        {item.title}
                    </Navbar.Link>
                ))}

                <form onSubmit={submit}>
                <Input size="lg" 
                    aria-label="Wallet address"
                    name="address"
                    maxLength={42}
                    bordered
                    css={{ width: "100%", pl: 10 }}
                    clearable
                    contentRight={
                        <Button size="sm" auto css={{ mr: 6 }} type="submit">
                            Lookup
                        </Button>
                    }
                    contentRightStyling={false}
                    placeholder="Wallet Address" />
                </form>

                <Navbar.Item>
                    <>
                        <Image src="/img/tokens/bnb.png" width={20} />
                        <Text css={{ ml: 10 }}>${bnbPrice}</Text>
                    </>
                </Navbar.Item>

                <Navbar.Item>
                    <Switch
                        checked={isDark}
                        iconOff={<SvgIcon icon="sun" size={16} stroke={3}/>}
                        iconOn={<SvgIcon icon="moon" size={16} stroke={3}/>}
                        onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
                    />
                </Navbar.Item>

            </Navbar.Content>

            <Navbar.Collapse>
                {links.map((item, index) => (
                    <Navbar.CollapseItem key={index}>
                        <Link
                            color="inherit" 
                            css={{ minWidth: "100%" }}
                            href={item.link}>
                            {item.title}
                        </Link>
                    </Navbar.CollapseItem>
                ))}

                <Navbar.CollapseItem>
                    <Input aria-label="wallet address"
                        size="xl"
                        name="address"
                        css={{ width: "100%"}}
                        clearable
                        contentRight={
                            <Button size="md" auto css={{ mr: 6 }} type="submit">
                                Lookup
                            </Button>
                        }
                        contentRightStyling={false}
                        placeholder="Wallet Address"
                    />
                </Navbar.CollapseItem>
            </Navbar.Collapse>
        </Navbar>
    );

}
