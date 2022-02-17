import PageHeader from "../components/home/header/";
import Features from "../components/home/features";
import Hero from "../components/home/hero";
import Layout from "../components/layout";

export default function Home() {
    
    return (
        <Layout title="Home">
            <PageHeader />
            <Features/>
            <Hero/>
        </Layout>
    )
}