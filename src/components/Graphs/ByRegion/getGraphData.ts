import REGIONS from "consts/regions";
import { ByRegionRes } from "types/searchTypes";

interface Dataset {
    label: string
    data: number[]
    backgroundColor: string
}

interface BarData {
    labels: string[]
    datasets: Dataset[]
}

type GetGraphData = (
    data: ByRegionRes,
    compareGearboxes: boolean,
) => BarData

const getGraphData: GetGraphData = (data, compareGearboxes) => {
    const graphData: BarData = {
        labels: [],
        datasets: []
    }

    if (compareGearboxes) {
        [
            {
                label: "Filtered - Automat",
                data: [],
                backgroundColor: `rgb(255, 99, 132)`
            },
            {
                label: 'Filtered - Mechanic',
                data: [],
                backgroundColor: 'rgb(75, 192, 192)'
            },
            {
                label: 'Total',
                data: [],
                backgroundColor: 'rgba(53, 162, 235, 0.15)'
            },
        ].forEach(item => graphData.datasets.push(item))
    } else {
        [
            {
                label: 'Filtered - Total',
                data: [],
                backgroundColor: 'rgb(75, 192, 192)'
            },
            {
                label: 'Total',
                data: [],
                backgroundColor: 'rgba(53, 162, 235, 0.15)'
            },
        ].forEach(item => graphData.datasets.push(item))
    }

    Object.entries(data)
        .sort((a, b) => a[1].countBase - b[1].countBase)
        .forEach(regionEntrie => {
            const [regionId, { countBase, countFilterA, countFilterM }] = regionEntrie

            graphData.labels.push(REGIONS[regionId])

            if (compareGearboxes) {
                graphData.datasets[0].data.push(countFilterA)
                graphData.datasets[1].data.push(countFilterM)
                graphData.datasets[2].data.push(countBase - countFilterA - countFilterM)
            } else {
                graphData.datasets[0].data.push(countFilterA + countFilterM)
                graphData.datasets[1].data.push(countBase - countFilterA - countFilterM)
            }
        })

    return graphData
}

export default getGraphData;