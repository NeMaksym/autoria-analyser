import { ByYearRes } from "types/searchTypes";

interface LabelProps {
    dataset: {
        label: string
    },
    label: string,
    formattedValue: string
}

const getGraphOptions = (data: ByYearRes) => {
    return {
        plugins: {
            title: {
                display: true,
                text: 'Cars Distribution By Years',
            },
            tooltip: {
                callbacks: {
                    label: ({ dataset, label, formattedValue }: LabelProps) => {
                        if (dataset.label === 'Total') {
                            return data[label].countBase
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
