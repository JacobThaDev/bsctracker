import { useEffect } from "react";
import { Container, Grid } from '@nextui-org/react'
import PageHeader from '../../components/global/header';
import Layout from "../../components/global/layout";
import SearchBar from "../../components/tracker/search";

export default function Tracker() {

    useEffect(async() => {

    }, []);

    return (
        <Layout title="Tracker">
            <PageHeader title="Wallet Tracker"/>
            <Container gap={2} css={{ mt:-35 }}>
                
                <Grid.Container gap={1}>
                    <Grid xs={12}>
                        <SearchBar/>
                    </Grid>
                </Grid.Container>
            </Container>
        </Layout>
    )
}