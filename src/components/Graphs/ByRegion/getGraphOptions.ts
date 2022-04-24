import REGIONS from "consts/regions";
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
                text: 'Cars Distribution By Region',
            },
            tooltip: {
                callbacks: {
                    label: ({ dataset, label, formattedValue }: LabelProps) => {
                        const regionId = Object.keys(REGIONS).find(regionId => REGIONS[regionId] === label)

                        if (dataset.label === 'Total' && regionId) {
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
