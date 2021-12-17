import Cookies from 'js-cookie';
import React, { Component, useEffect, useState } from 'react';
import { Card, Row, Col, Table, Alert } from 'react-bootstrap';

import * as Functions from '../../functions';

export default class Transactions extends Component {


    render() {
        let address = Cookies.get("wallet");
        let table   = [];
        let txns    = this.props.txns;

        if (txns == null    
            || typeof txns === "undefined" 
            || !Array.isArray(txns) 
            || txns.length == 0 ) {
            return (
                <Alert variant="danger">
                    <i className="fal fa-exclamation-triangle me-2"></i>
                    Unable to load transactions.
                </Alert>
            );
        }

        let reversed = txns.reverse();

        try {
            for (let i = 0; i < reversed.length; i++) {
                let txn   = reversed[i];
                let isBuy = txn.to.toLowerCase() == address.toLowerCase();
                let value = parseFloat(txn.value/1000000000);

                let formatted = value.toLocaleString(undefined, { 
                    minimumFractionDigits: 9 
                })

                table.push(
                <tr key={i}>
                    <td className={"py-2 ps-3 "+(isBuy ? "text-success" : "text-danger")}>
                        <span className={"badge rounded-pill bg-" + (isBuy? "success" : "danger")}>
                            {txn.type}
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

        } catch(err) {
            console.log(err);
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

}