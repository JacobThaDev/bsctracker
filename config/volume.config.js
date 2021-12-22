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
            radius: 0
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
            display: false,
            beginAtZero: false,
            grid: {
                display: false
            }
        },
    },
    plugins: {
        legend: {
            display: false,
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
                    return "$"+tooltipItem.raw.toLocaleString();
                }
            }
        },
    },
};