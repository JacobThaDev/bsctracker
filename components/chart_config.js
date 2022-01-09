module.exports = {
    colors: [
        '#FF0000', '#00FF00',
    ],
    chart: {
        backgroundColor: '#1f242c',
        chart: {
            type: 'waterfall'
        },
    },
    credits: {
        enabled: false
    },
    rangeSelector: {
        allButtonsEnabled: true,
        buttons: [
            {
                type: 'day',
                count: 1,
                text: '1d'
            },
            {
                type: 'day',
                count: 3,
                text: '3d'
            }, 
            {
                type: 'day',
                count: 7,
                text: '7d'
            }, 
            {
                type: 'day',
                count: 14,
                text: '14d'
            }, 
            {
                type: 'day',
                count: 30,
                text: '30d'
            }, 
            {
                type: 'ytd',
                text: 'YTD'
            }
        ],
        selected: 1
    },
    xAxis: {
        visible: false,
    },
    yAxis: {
        visible: false,
    },
    title: {
        text: ""
    },
    tooltip: {
        split: true
    },
    series: [{
        color: '#8463ff',
        type: "line",
        name: "SFM",
        data: [],
        dataGrouping: {
            units: [
                [
                    "hour", // unit name
                    [1] // allowed multiples
                ],
                ["hour", [1]]
            ]
        }
    }]
};