import axios from "axios";
import { useEffect, useState } from "react";

import HighStock from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { Card } from "react-bootstrap";

export default function ChartCard({ ... props}) {

    const [data, setData]           = useState({ options: {} });
    const [chartData, setChartData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    let options = require('../../chart_config');

    const transformChartData = (options, array) => {
        const dataLength = array.length;

        for (var i = 0; i < dataLength; i += 1) {
            options.series[0].data.push([
                array[i].dateline, // the date
                array[i].price, // open
            ]);
        }
        return options;
    };

    useEffect(async() => {
        try {
            setIsLoading(true);
            let res = await axios.get('https://api.bsctracker.net/price/history');

            const newOptions = transformChartData(options, res.data);
            setData({ options: newOptions });

            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    }, []);

    if (isLoading) {
        return "Loading Chart...";
    }

    return (
    <Card className="overflow-hidden mb-3">
        <HighchartsReact
            highcharts={HighStock}
            constructorType={"stockChart"}
            options={data.options}
        />
    </Card>);
}