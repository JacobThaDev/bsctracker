import { useEffect, useState } from "react";
import { Col, Container, Form, FormControl, Row } from "react-bootstrap";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import TokenIcons from "./token_icons";
import WalletForm from "./wallet_form";
import StarField from "../../starfield";

export default function PageHeader({...props}) {

    return(
        <section className="home-header position-relative" id="test">
            <StarField/>

            <Container className="position-relative">
                <Row className="align-items-center">
                    <Col xs={12} className="pe-lg-5">

                        <h6 className="text-white">
                            - Welcome to
                        </h6>

                        <h1 className="display-4 text-white fw-bold mb-4">
                            A better way 
                            <strong className="d-block text-white h1">
                                to track your DeFi Wallet.
                            </strong>
                        </h1>

                        <p className="lead text-white opacity-8">
                            Complete modern approach to aid your DeFi journey.
                        </p>

                        <div className="mt-5" style={{ maxWidth: 450 }}>
                            <WalletForm tokens={props.tokens}/>
                        </div>

                        <TokenIcons tokens={props.tokens}/>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}