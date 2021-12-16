import Cookies from 'js-cookie';
import React, { Component, useEffect, useState } from 'react';
import { Card, Row, Col, Table } from 'react-bootstrap';

import * as Functions from '../../functions';

export default class Transactions extends Component {

    txnList;
    lastRefresh;

    async componentDidMount() {
        this.refresh();
    }

    async refresh() {
        let address = Cookies.get("wallet");
        try {
            let txns = await Functions.getTxns(address);
            if (txns.original) {
                this.setState({ txnList: txns.original });
            }
        } catch(err) {

        }
    }

    componentWillUnmount() {

    }

    render() {
        let table = [];
        let address = Cookies.get("wallet");

        try {
            if (this.state && this.state.txnList && this.state.txnList.length > 0) {
                let list = this.state.txnList.reverse();

                for (let i = 0; i < list.length; i++) {
                    let txn   = list[i];
                    let isBuy = txn.to.toLowerCase() == address.toLowerCase();
                    let value = parseFloat(txn.value/1000000000);

                    let formatted = value.toLocaleString(undefined, { 
                        minimumFractionDigits: 9 
                    })

                    table.push(
                    <tr key={i}>
                        <td className={"py-2 ps-3 "+(isBuy ? "text-success" : "text-danger")}>
                            <span className={"badge rounded-pill bg-" + (isBuy? "success" : "danger")}>
                                {isBuy ? "Buy": "sell"}
                            </span>
                        </td>
                        <td className="py-2">{formatted}</td>
                        <td className="small text-muted text-end">
                            { Functions.timestampToDate(txn.timeStamp) }
                        </td>
                        <td className="text-end">
                            <a href={"https://bscscan.com/tx/"+txn.hash}
                                className="btn btn-success btn-sm w-100 rounded-pill" target="_blank">
                                BscScan
                            </a>
                        </td>
                    </tr>);
                }
            }
        } catch(err) {
            //console.log(err);
        }

        return(
        <>
            <Card className="mb-2 shadow-sm">
                <Card.Header className="bg-transparent">
                    Transaction History
                </Card.Header>
                <Table className="mb-0 table-striped table-borderless">
                    <thead>
                        <tr>
                            <th style={{width: 100}}></th>
                            <th>Amount</th>
                            <th className="text-end">Date</th>
                            <th style={{width: 100}}>Txn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table}
                    </tbody>
                </Table>
            </Card>
            <p className="small text-muted mb-5">
                Refreshing too quickly might trigger a rate limit from BscScan, 
                and cause this to not load.
            </p>
        </>);
    }

    /*const [txns, setTxns] = useState(null);

    useEffect(() => {
        let address = Cookies.get("wallet");
        update(address); // get the initial list
        const interval = setInterval(async() => update(address), 60000);
        return() => clearInterval(interval);
    }, []);

    const update = async(address) => {
        let txnList = await Functions.getTxns(address);

        setTxns(txnList.original);
        console.log(txnList);
        console.log(txns);
    };

    return(<>
        <Card>
            <Table className="mb-0 table-striped table-borderless">
                <tr>
                    <td>yeet</td>
                </tr>
                <tr>
                    <td>yeet</td>
                </tr>
                <tr>
                    <td>yeet</td>
                </tr>
            </Table>
        </Card>
    </>);*/
}