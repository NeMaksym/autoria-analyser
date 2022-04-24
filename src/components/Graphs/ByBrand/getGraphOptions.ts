const getGraphOptions = () => {
    return {
        plugins: {
            title: {
                display: true,
                text: 'Cars Distribution By Brand',
            },
            legend: {
                position: 'bottom',
            },
        },
        responsive: true,
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
