import { ByYearRes } from "types/searchTypes";
import GRAPH_PALETTE from 'consts/graphPalette';

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
    data: ByYearRes,
    compareGearboxes: boolean
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
                backgroundColor: GRAPH_PALETTE.automatColor
            },
            {
                label: 'Filtered - Mechanic',
                data: [],
                backgroundColor: GRAPH_PALETTE.mechanicColor
            },
            {
                label: 'Total',
                data: [],
                backgroundColor: GRAPH_PALETTE.totalColor
            },
        ].forEach(item => graphData.datasets.push(item))
    } else {
        [
            {
                label: 'Filtered - Total',
                data: [],
                backgroundColor: GRAPH_PALETTE.mechanicColor
            },
            {
                label: 'Total',
                data: [],
                backgroundColor: GRAPH_PALETTE.totalColor,
            },
        ].forEach(item => graphData.datasets.push(item))
    }

    Object.entries(data).forEach(yearEntrie => {
        const [year, { countBase, countFilterA, countFilterM }] = yearEntrie

        graphData.labels?.push(year)

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
