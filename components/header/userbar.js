import Cookies from 'js-cookie';
import React, { Fragment } from 'react';
import { Button, Card, Container, OverlayTrigger, Tooltip } from 'react-bootstrap';


export default function Userbar({...props}) {
 
    let address = Cookies.get("wallet");

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            { address }
        </Tooltip>
    );

    const logout = () => {
        Cookies.remove("wallet");
        window.location = "/";
    }

    return (
        <Fragment>
            <div className="userbar shadow-sm mb-4">
                <div className="d-flex align-items-center justify-content-between w-100">
                    <div>{props.title}</div>
                    <div>
                        <OverlayTrigger
                            placement="left"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip}>
                            <Button className="bg-gradient-primary rounded-pill px-4" 
                                id="address"
                                onClick={() => logout()}>
                                Sign Out
                            </Button>
                        </OverlayTrigger>
                    </div>
                </div>
            </div>
        </Fragment>
    );
    
}