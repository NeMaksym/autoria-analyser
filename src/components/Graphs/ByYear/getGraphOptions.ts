import { YearData } from "types/searchTypes";

interface LabelProps {
    dataset: {
        label: string
    },
    label: string,
    formattedValue: string
}

const getGraphOptions = (data: YearData[]) => {
    return {
        plugins: {
            title: {
                display: true,
                text: 'За роком випуску',
            },
            tooltip: {
                callbacks: {
                    label: ({ dataset, label, formattedValue }: LabelProps) => {
                        if (dataset.label === 'Загалом на ринку') {
                            return data.find(yearData => yearData.year === Number(label))?.count
                        }

                        return formattedValue
                    },
                }
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
