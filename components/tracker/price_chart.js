import React, { useEffect, useState }  from 'react';
import { Card } from 'react-bootstrap';

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
import axios from 'axios';

export default function PriceChart({...props}) {

    const [chartData, setChartData] = useState(null);
    const chart_config = require("../../config/chart.config");

    useEffect(async() => {
        let priceArr  = [],
            volumeArr = [];

        let res    = await axios.get("https://api.bsctracker.net/price/history");
        let data   = res.data.reverse();
        let labels = [];

        for (let i = 0; i < data.length; i++) {
            let entry     = data[i];
            let timestamp = entry.dateline;
            let date      = new Date(timestamp);

            //only push price to chart if it's on the hour.
            if (date.getMinutes() == 0) {
                priceArr.push(entry.price);
                volumeArr.push(entry.volume);
                labels.push(date.toLocaleString());
            }
        }

        setChartData({
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
        });
    }, []);

    if (!chartData) {
        return null;
    }

    return (<>
        <Card className="shadow-sm mb-3">
            <Card.Header className="border-0 bg-transparent">
                Price over the last 3 days
            </Card.Header>
            <Card.Body style={{maxHeight: 300}}>
                <Line options={chart_config} data={chartData} height={250}/>
            </Card.Body>
        </Card>
    </>);
    
}