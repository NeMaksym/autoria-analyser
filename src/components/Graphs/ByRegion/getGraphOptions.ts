import REGIONS from "consts/regions";
import { ByRegionRes } from "types/searchTypes";

interface LabelProps {
    dataset: {
        label: string
    },
    label: string,
    formattedValue: string
}

const getGraphOptions = (data: ByRegionRes) => {
    return {
        plugins: {
            title: {
                display: true,
                text: 'За регіоном',
            },
            tooltip: {
                callbacks: {
                    label: ({ dataset, label, formattedValue }: LabelProps) => {
                        const regionId = Object.keys(REGIONS).find(regionId => REGIONS[regionId] === label)

                        if (dataset.label === 'Загалом на ринку' && regionId) {
                            return data[regionId].countBase
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
