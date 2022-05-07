import { YearData } from "types/searchTypes";
import GraphOptions from "consts/graphOption";

interface LabelProps {
    dataset: {
        label: string
    },
    label: string,
    formattedValue: string
}

const getGraphOptions = (data: YearData[]) => {
    return {
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: ({ dataset, label, formattedValue }: LabelProps) => {
                        if (dataset.label === GraphOptions.Total) {
                            const yearData = data.find(item => item.year === Number(label))

                            return `${dataset.label}: ${yearData?.count.toLocaleString() || ''}`
                        }

                        return `${dataset.label}: ${formattedValue}`
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
