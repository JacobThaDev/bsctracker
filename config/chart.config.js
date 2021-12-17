module.exports = {
    tension: 0.2,
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    hover: {
        mode: 'index',
        intersect: false
    },
    interaction: {
        intersect: false
    },
    elements: {
        line: {
            fill: true,
            borderWidth: 1
        },
        point: {
            radius: 1
        }
    },
    scales: {
        x: {
            display: false,
            position: "left",
            grid: {
                display: false
            }
        },
        y: {
            display: true,
            beginAtZero: false,
            grid: {
                display: false
            }
        },
    },
    plugins: {
        legend: {
            position: 'bottom',
        },
        title: {
            display: false,
            text: 'Chart.js Line Chart',
        },
        tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
                label: function(tooltipItem, data) {
                    return tooltipItem.raw;
                }
            }
        },
    },
};