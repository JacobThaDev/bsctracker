import { useState } from "react";
import { Card, Table } from "react-bootstrap";

import * as Functions from '../../../functions';

export default function StatCard({ ... props}) {

    const [stats, setState] = useState(null);

    useState(async() => {
        let res = await Functions.getStats();
        setState(res);
    }, []);

    if (!stats) {
        return (
        <Card className="text-center">
            <Card.Body className="py-5">
                <h3><i className="fal fa-spinner fa-pulse fa-lg"></i></h3>
                Fetching Stats
            </Card.Body>
        </Card>)
    }

    return (
        <Card className="mb-3">
            <Card.Header className="border-0 bg-transparent">
                Token Statistics
            </Card.Header>
            <Table className="table-borderless table-striped mb-0">
                <tbody>
                    <tr>
                        <td className="ps-3">Transfers</td>
                        <td>{stats.count.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td className="ps-3">Senders</td>
                        <td>{stats.sender_count.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td className="ps-3">Receivers</td>
                        <td>{stats.receiver_count.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td className="ps-3">Amount</td>
                        <td>{(stats.amount/1000000000000).toLocaleString()} <small>TR</small> Tokens</td>
                    </tr>
                    <tr>
                        <td className="ps-3">Median</td>
                        <td>{stats.median.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td className="ps-3">Average</td>
                        <td>{stats.average.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td className="ps-3">Days Open</td>
                        <td>{stats.days.toLocaleString()}</td>
                    </tr>
                </tbody>
            </Table>
        </Card>
    )

}