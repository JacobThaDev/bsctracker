import { useEffect, useState } from "react";
import { Alert, Card, Col, Container, Row } from "react-bootstrap";
import * as Functions from "../../functions";
import Layout from "../../components/layout";
import axios from 'axios';

export default function Nfts({...props}) {

    const [nfts, setNfts] = useState(null);
    const [loaded, setLoaded] = useState(false);
    
    useEffect(async() => {
        let res = await axios.get("/api/nfts/"+props.address);
        let collection = res.data;
        let cards  = [];
        let groups = [];

        for (let nft of collection) {
            let metadata  = nft.metadata;

            if (!nft.name) {
                if (metadata && metadata.properties && metadata.properties.title) {
                    nft.name = metadata.properties.title;
                }
            }

            if (!groups[nft.name])
                groups[nft.name] = [];
            groups[nft.name].push(nft);
        }

        let keys = Object.keys(groups);

        keys.forEach((keyId, index) => {
            let nfts   = groups[keyId];
            let nft_cards = [];

            nfts.forEach(async(nft, index) => {
                let image_url = nft.image;
                let metadata  = nft.metadata;
                let name      = metadata && metadata.name ? metadata.name : nft.name;

                nft_cards.push(
                <Col xs={12} md={6} lg={4} xl={3} key={index}>
                    <Card className="shadow-sm mb-4 nft-card">
                        <a href={image_url} target="_blank">
                            <div style={{ backgroundImage: 'url('+image_url+')' }} 
                                className="text-center overflow-hidden nft-image">
                            </div>
                        </a>

                        <Card.Body>
                            {name}
                        </Card.Body>
                    </Card>
                </Col>)
            });

            cards.push(
                <div key={index}>
                    <Row>
                        <Col>
                            <p className="h5 mb-4">
                                {keyId} ({nfts.length})
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        {nft_cards}
                    </Row>
                </div>
            );
        });

        setNfts(cards);
        setLoaded(true);
    }, []);

    const loader = (
        <div className="text-center py-5">
            <i className="fad fa-spinner fa-pulse fa-3x mb-3"></i>
            <h1>Loading...please wait</h1>
            <p>Please wait while we load this collection</p>
        </div>
    );
    
    if (loaded) {

    }

    return(
        <Layout title={Functions.shortenAddress(props.address)}>
            <div className="small-header">
                <Container>
                    <h2 className="text-white fw-bold mb-0">
                       {Functions.shortenAddress(props.address)}
                    </h2>
                    <p className="text-white-50">
                        NFT Collection // Network: Bsc
                    </p>
                </Container>
            </div>

            <section className="mb-5">
                
                    {loaded ? 
                        <div>
                            <Alert variant="info" className="rounded-0 shadow-sm mb-5">
                                <Container>
                                    <strong>Please note</strong> that not all images may load due to formats, missing info, etc.
                                </Container>
                            </Alert>
                            <Container>
                                {nfts} 
                            </Container>
                        </div>
                    : loader}
            </section>
        </Layout>
    )
}

Nfts.getInitialProps = async({ query }) => {
    const { address } = query;

    return { address: address }
};