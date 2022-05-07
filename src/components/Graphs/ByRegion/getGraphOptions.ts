import REGIONS from "consts/regions";
import GraphOptions from "consts/graphOption";
import { RegionData } from "types/searchTypes";

interface LabelProps {
    dataset: {
        label: string
    },
    label: string,
    formattedValue: string
}

const getGraphOptions = (data: RegionData[]) => {
    return {
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: ({ dataset, label, formattedValue }: LabelProps) => {
                        const regionId = Object.keys(REGIONS).find(regionId => REGIONS[regionId] === label)

                        if (dataset.label === GraphOptions.Total) {
                            const yearData = data.find(regionData => regionData.id === Number(regionId))

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
