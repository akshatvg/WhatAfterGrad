
$(function () {
    // Bar Chart
    var ctx = document.getElementById('barChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Blog 1', 'Blog 2', 'Blog 3', 'Blog 4', 'Blog 5', 'Blog 6', 'Blog 7'],
            datasets: [{
                data: [12, 3, 5, 6, 3, 7, 2],
                backgroundColor: [
                    '#0055FB',
                    '#0055FB',
                    '#0055FB',
                    '#0055FB',
                    '#0055FB',
                    '#0055FB',
                    '#0055FB',
                ],
                borderColor: [
                    '#0055FB',
                    '#0055FB',
                    '#0055FB',
                    '#0055FB',
                    '#0055FB',
                    '#0055FB',
                    '#0055FB',
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                xAxes: [{
                    barPercentage: 0.4
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            legend: {
                display: false
            },
        }
    });
});

console.clear();