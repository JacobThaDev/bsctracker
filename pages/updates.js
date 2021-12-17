import React, { useEffect, Fragment, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Footer from '../components/global/footer';
import PageHead from '../components/head';
import Userbar from '../components/header/userbar';

export default function Updates({...props}) {

    const [updates, setUpdates] = useState({});
    
    useEffect(() => {
        
    }, []);

    return(
        <Fragment>
            <PageHead title="Update Log" />

            <div className="d-flex align-items-center login-box flex-column">
                <div className="login-box-inner" style={{maxWidth: 700}}>
                    <h5>Update History</h5>
                    <Card className="text-center">
                        <Card.Body>

                        </Card.Body>
                    </Card>
                    <Footer/>
                </div>
            </div>

            


        </Fragment>);
    

}