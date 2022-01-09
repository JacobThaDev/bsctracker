import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Copyright from '../components/global/copyright';
import Layout from '../components/global/layout';
import SearchBar from '../components/home/search';
import StatCard from '../components/home/stats';
import BurnedCard from '../components/home/stats/burned';
import ChartCard from '../components/home/stats/chart';
import CirculatingCard from '../components/home/stats/circulating';
import HoldersCard from '../components/home/stats/holders';
import MarketcapCard from '../components/home/stats/marketcap';
import PriceCard from '../components/home/stats/price';
import VolumeCard from '../components/home/stats/volume';

import * as Functions from '../functions';

export default function Home() {

    const [tokenData, setTokenData] = useState(null);

    useEffect(async() => {
        let interval;

        if (!interval) {
            getData();

            interval = setInterval(async() => {
                getData();
            }, 10000);
        }

        return() => {
            if (interval) {
                clearInterval(interval);
                interval = null;
            }
        };
    }, []);

    const getData = async() => {
        try {
            let supply      = 1_000_000_000_000;
            let priceData   = await Functions.getPrice();
            let burned      = await Functions.getBurned();
            let circulating = supply - burned;

            setTokenData({
                burned: burned / 1_000_000_000,
                circulating: circulating / 1_000_000_000,
                mcap: (circulating * priceData.price),
                price: priceData.price,
                volume: priceData.volume
            });

        } catch (err) {
            
        }
    }

    let icon = <i className="fal fa-spinner fa-pulse"></i>;

    let circulating = icon;
    let burned      = icon;
    let marketcap   = icon;
    let price       = icon;
    let volume      = icon;

    if (tokenData) {
        circulating = Functions.formatNumber(tokenData.circulating, 3)+" B";
        burned      = Functions.formatNumber(tokenData.burned, 3)+" B";
        marketcap   = "$"+Functions.formatNumber(tokenData.mcap/1000000000, 3)+" B";
        price       = "$"+tokenData.price;
        volume      = "$"+Functions.formatNumber(tokenData.volume, 0);
    }

    return (
        <Layout title="Home" desc="The homepage for mah awesum app">

            <Container>
                <SearchBar/>

                <Row>
                    <Col xs={12} lg={4}>
                        <PriceCard value={price} />
                    </Col>
                    <Col xs={12} lg={4}>
                        <CirculatingCard value={circulating} />
                    </Col>
                    <Col xs={12} lg={4}>
                        <BurnedCard value={burned} />
                    </Col>
                    <Col xs={12} lg={4}>
                        <MarketcapCard value={marketcap} />
                    </Col>
                    <Col xs={12} lg={4}>
                        <VolumeCard value={volume} />
                    </Col>
                    <Col xs={12} lg={4}>
                        <HoldersCard value={0} />
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} lg={4}>
                        <StatCard/>
                    </Col>
                    <Col xs={12} lg={8}>
                        <ChartCard value={price}/>
                    </Col>
                </Row>

                <Copyright/>
            </Container>
        </Layout>
    )
}