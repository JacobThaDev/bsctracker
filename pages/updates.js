import axios from 'axios';
import React, { useEffect, Fragment, useState } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import Footer from '../components/global/footer';
import PageHead from '../components/head';
import RelativeTime from '@yaireo/relative-time'

export default function Updates({...props}) {

    const [updates, setUpdates] = useState(null);
    
    useEffect(async() => {
        try {
            let response = await axios.get("https://api.github.com/repos/ogkingfox/sfmv2-tracker/commits");
            setUpdates(response.data);
        } catch (err) {

        }
    }, []);

    let table = [];

    if (updates) {
        for (let i = 0; i < updates.length; i++) {
            
            // limit to last 10 updates (9 because index starts at 0...derp)
            if (i > 9) {
                break;
            }

            let update    = updates[i];
            let timestamp = update.commit.author.date;

            let dateObj = new Date(timestamp);
            let relativeTime = new RelativeTime(); // defaults to OS locale
            
            table.push(
                <tr key={i}>
                    <td>
                        <img 
                            src={update.author.avatar_url} 
                            width={24} 
                            className="rounded-circle"/>
                    </td>
                    <td>
                        <p className="mb-0">{update.commit.message}</p>
                        <p className="mb-0 small text-muted">
                            <a href={update.author.html_url} 
                                    target="_blank" 
                                    rel="nofollow noopener" 
                                    className="text-info">
                                {update.author.login}
                            </a> commited {relativeTime.from(dateObj)}
                        </p>
                    </td>
                    <td style={{fontFamily: "monospace"}}>
                        <a href={update.html_url} 
                                className="small text-info" 
                                target="_blank" 
                                rel="nofollow noopener">
                            {update.sha.substr(0, 7)}
                        </a>
                    </td>
                </tr>
            )
        }    
    }

    return(
        <Fragment>
            <PageHead title="Update Log" />

            <div className="d-flex align-items-center login-box flex-column">
                <div className="login-box-inner" style={{maxWidth: 700}}>

                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <div>
                            <h4 className="mb-0">
                                Update History
                            </h4>
                        </div>
                        <div>
                            <a href="/track" className="btn btn-info text-white">
                                <i className="fal fa-home"></i>
                            </a>
                        </div>
                    </div>
                    <Card className="text-start">
                        <Table borderless striped className="mb-0">
                            <tbody>{table}</tbody>
                        </Table>
                    </Card>
                    <Footer/>
                </div>
            </div>
        </Fragment>);
    

}