import { useEffect, useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import * as Functions from "../../functions";

export default function TxnList({...props}) {
    
    const [txns, setTxns]     = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!props.data) {
            return;
        }

        let txnlist  = props.data.txnList;
        let token    = props.data.token;
        let filtered = [];

        txnlist.forEach((txn, index) => {
            if (txn.contractAddress != token.contract.toLowerCase()) {
                return;
            }

            txn.value = (txn.value / 10 ** txn.tokenDecimal);

            if (txn.from.toLowerCase() == props.data.address.toLowerCase()) {
                txn.type = "sell";
            } else {
                txn.type = "buy";
            }

            let date = new Date(txn.timeStamp * 1000);
            
            filtered.push(
            <Accordion.Item eventKey={index} key={index}>
                <Accordion.Header className="shadow-none">
                    <div className="d-flex align-items-center">
                        <div>
                            {txn.type == "buy" 
                                ? <i className="fas fa-arrow-down text-success fa-fw me-2"></i> 
                                : <i className="fas fa-arrow-up text-danger fa-fw me-2"></i>}
                            
                            <span className="fw-bold me-2">
                                {Functions.formatNumber(txn.value, 5)}
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
            </Accordion.Item>);
        });

        setTxns(filtered);
        setLoaded(true);
    }, [props.data]);

    return(
        <Card className="border-0 shadow-sm mb-3">
            <Card.Header className="bg-transparent">
                Transaction History
            </Card.Header>
            {!loaded ? <Card.Body>Loading...</Card.Body> : 
                <Accordion defaultActiveKey="0" className="accordion-flush">
                    {txns}
                </Accordion>
            }
        </Card>)
}