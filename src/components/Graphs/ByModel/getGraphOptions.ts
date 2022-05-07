const getGraphOptions = () => {
    return {
        plugins: {
            title: {
                display: true,
                text: 'За моделлю',
            },
            legend: {
                position: 'bottom',
            },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    } as any;
};

export default getGraphOptions;
