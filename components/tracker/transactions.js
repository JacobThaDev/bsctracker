import { Card, Row, Col, Table, Alert  } from "react-bootstrap";
import FontIcon from "../global/fonticon";

export default function TxnList({...props}) {

    const txns  = props.txns;
    const table = [];

    if (txns == null    
        || typeof txns === "undefined" 
        || !Array.isArray(txns) 
        || txns.length == 0 ) {
        return (
            <div className="text-center mt-5">
                <FontIcon icon="spinner fa-pulse" size="3x" />
            </div>
        );
    }

    let reversed = txns.reverse();

    try {
        for (let i = 0; i < reversed.length; i++) {
            let txn   = reversed[i];
            let isBuy = txn.to.toLowerCase() == props.address.toLowerCase();
            let value = parseFloat(txn.value/1000000000);

            let formatted = value.toLocaleString(undefined, { 
                minimumFractionDigits: 9 
            })

            let date  = new Date(txn.timeStamp * 1000);

            table.push(
            <tr key={i} style={{lineHeight: "1em"}}>
                <td className="py-2 ps-3">
                    <i className={"fal fa-arrow-"+(isBuy ? "up" : "down")+(isBuy ? " text-success" : " text-danger")}></i>
                </td>
                <td className="py-2">{formatted}</td>
                <td>
                    ${(value * txn.price).toFixed(2)}<br/>
                    <p className="text-muted small mb-0">{txn.price}</p>
                </td>
                <td className="small text-muted text-end">
                    {date.toLocaleDateString()}<br/>
                    {date.toLocaleTimeString()}
                </td>
                <td className="text-end">
                    <a href={"https://bscscan.com/tx/"+txn.hash}
                        className="btn btn-primary btn-sm w-100 rounded-pill" target="_blank">
                        BscScan
                    </a>
                </td>
            </tr>);
        }

    } catch(err) {
        console.log(err);
    }

    return (
        <Card className="mb-2 shadow-sm">
            <Card.Header className="bg-transparent">
                Transaction History
            </Card.Header>
            <Table className="mb-0 table-striped table-borderless">
                <thead>
                    <tr>
                        <th style={{width: 40}}></th>
                        <th>Amount</th>
                        <th>Price</th>
                        <th className="text-end">Date</th>
                        <th style={{width: 100}}>Txn</th>
                    </tr>
                </thead>
                <tbody>
                    {table}
                </tbody>
            </Table>
        </Card>
    )
}