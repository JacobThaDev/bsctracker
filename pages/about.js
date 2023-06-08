import Layout from "../components/Layout";
import PageNav from "../components/global/PageNav";
import Footer from "../components/global/Footer";

import { Text, Container } from "@nextui-org/react";
import Link from "next/link";

export default function About() {

    const name    = <Link href="https://twitter.com/OG_KingFox" target="_blank" rel="nofollow">Jacob Smith</Link>
    
    const email   = (
        <Link href="mailto:bsctracker.net@gmail.com" target="_blank" rel="nofollow">
            bsctracker.net@gmail.com
        </Link>);

    const twitter = (
        <Link href="https://twitter.com/OG_KingFox" target="_blank" rel="nofollow">
            @OG_KingFox
        </Link>);

    const github = (
        <Link href="https://github.com/OGKingFox/bsctracker" target="_blank" rel="nofollow">
            ogkingfox/bsctracker
        </Link>);

    return(
        <Layout>
            <PageNav/>

            <Container css={{ my: 100, h: 400 }} gap={2} md>
                    <Text size={40} css={{ mb: 30, fontWeight: 900 }}>
                       About BscTracker
                    </Text>
                    <Text css={{ mb: 20 }}>
                        Created by {name}, BscTracker is an open-source website for tracking all of the 
                        popular cryptocurrencies on the Binance Smart Chain. We take requests
                        so if you want your token added, just give us a holler via&nbsp; 
                        Email or Twitter!
                    </Text>

                    <Text>Email: {email}</Text>
                    <Text>Twitter: {twitter}</Text>
                    <Text>Github: {github}</Text>
            </Container>

            <Footer/>
        </Layout>
    )
}