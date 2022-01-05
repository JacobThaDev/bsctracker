import React, { useEffect, useState }  from 'react';
import { Card, Row, Col } from 'react-bootstrap';

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
import axios from 'axios';
import * as Functions from '../../functions';

export default function PriceChart({...props}) {

    const [priceData, setPriceData] = useState(null);
    const [chartData, setChartData] = useState(null);

    let price_config  = require("../../config/chart.config");
    let volume_config = require("../../config/volume.config");

    useEffect(async() => {
        let tokenData = await Functions.getTokenData();
        setPriceData(tokenData);

        let priceArr  = [],
            volumeArr = [];

        let res    = await axios.get("https://api.bsctracker.net/price/history");
        let data   = res.data;
        let labels = [];

        if (data && Array.isArray(data)) {
            for (let i = 0; i < data.length; i++) {
                let entry     = data[i];
                let timestamp = entry.dateline;
                let date      = new Date(timestamp);
                let minutes   = date.getMinutes();

                if (minutes % 60 != 0) {
                    continue;
                }

                priceArr.push(entry.price);
                volumeArr.push(entry.volume);
                labels.push(date.toLocaleString());
            }
        }

        let chart_data = [
            {
                labels ,
                datasets: [
                    {
                        label: 'Price',
                        data: priceArr,
                        borderColor: 'rgb(132, 99, 255)',
                        backgroundColor: 'rgba(132, 99, 255, 0.1)',
                        fill:true
                    }
                ]
            },
            {
                labels ,
                datasets: [
                    {
                        label: 'Volume',
                        data: volumeArr,
                        borderColor: 'rgb(132, 99, 255)',
                        backgroundColor: 'rgba(132, 99, 255, 0.1)',
                        fill:true
                    }
                ]
            }
        ];

        setChartData(chart_data);
    }, []);

    if (!chartData) {
        return null;
    }

    return (<>
    <Row>

        <Col xs={12} lg={6}>
            <Card className="shadow-sm mb-3 overflow-hidden">
                <Card.Header className="border-0 bg-transparent">
                    <h5 className="mb-0">${priceData.price}</h5>
                    <p className="small text-muted">Current Price (USD)</p>
                </Card.Header>
                <Card.Body style={{maxHeight: 300}} className="p-0">
                    <Line 
                        options={price_config} 
                        data={chartData[0]} 
                        height={250} />
                </Card.Body>
            </Card>
        </Col>

        <Col xs={12} lg={6}>
            <Card className="shadow-sm mb-3 overflow-hidden">
                <Card.Header className="border-0 bg-transparent">
                    <h5 className="mb-0">${priceData.volume.toLocaleString()}</h5>
                    <p className="small text-muted">Current Volume (USD)</p>
                </Card.Header>
                <Card.Body style={{maxHeight: 300}} className="p-0">
                    <Line 
                        options={volume_config} 
                        data={chartData[1]} 
                        height={250} />
                </Card.Body>
            </Card>
        </Col>
    </Row>
    </>);
    
}