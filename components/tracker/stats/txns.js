import { useEffect, useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import * as Functions from "../../../functions";

export default function TxnList({...props}) {
    
    const [txns, setTxns] = useState([]);

    useEffect(() => {
        let txnList = props.data.txnList;

        if (txnList.length == 0 || txnList.error) {
            return;
        }

        let table = [];

        txnList.forEach((txn, index) => {
            let date = new Date(txn.timeStamp*1000);
    
            table.push(
                <Accordion.Item eventKey={index} key={index}>
                    <Accordion.Header className="shadow-none">
                        <div className="d-flex align-items-center">
                            <div>
                                {txn.direction == "in" 
                                    ? <i className="fas fa-arrow-down text-success fa-fw me-2"></i> 
                                    : <i className="fas fa-arrow-up text-danger fa-fw me-2"></i>}
                                
                                <span className="fw-bold me-2">
                                    {Functions.formatNumber(txn.value, 3)}
                                </span>
                            </div>
                            <div className="small text-muted">
                                {date.toDateString()}
                            </div>
                        </div>
                    </Accordion.Header>
                    
                    <Accordion.Body>
                        <p className="mb-0 fw-bold">Hash</p>
                        <p>{txn.hash}</p>
    
                        <p className="mb-0 fw-bold">From</p>
                        <p>
                        <a href={"https://bscscan.com/address/"+txn.from}
                            target="_blank"
                            rel="nofollow noopener noreferrer">
                            {txn.from}
                        </a>
                        </p>
    
                        <p className="mb-0 fw-bold">Confirmations</p>
                        <p>{Functions.formatNumber(parseInt(txn.confirmations), 0)}</p>
    
                        <a href={"https://bscscan.com/tx/"+txn.hash} 
                            className="btn btn-primary"
                            target="_blank"
                            rel="nofollow noopener noreferrer">
                            View on Bscscan
                        </a>
                    </Accordion.Body>
                </Accordion.Item>
            )

            setTxns(table);
        });

    }, [props.data.txnList]);

    if (txns.length == 0) {
        return (
        <Card className="border-0 shadow-sm mb-3">
            <Card.Header className="bg-transparent">
                Transaction History
            </Card.Header>
            <Card.Body>
                You don't have any transactions!
            </Card.Body>
        </Card>)
    }

    return(
        <Card className="border-0 shadow-sm mb-3">
            <Card.Header className="bg-transparent">
                Transaction History
            </Card.Header>
            <Accordion defaultActiveKey="0" className="accordion-flush" >
                {txns}
            </Accordion>
        </Card>)
}