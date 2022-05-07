import { YearData } from "types/searchTypes";
import GraphOptions from "consts/graphOption";
import GRAPH_PALETTE from 'consts/graphPalette';

interface Dataset {
    label: string
    data: number[]
    backgroundColor: string
}

interface BarData {
    labels: number[]
    datasets: Dataset[]
}

type GetGraphData = (
    data: YearData[],
    compareGearboxes: boolean
) => BarData

const getGraphData: GetGraphData = (data, compareGearboxes) => {
    const graphData: BarData = {
        labels: [],
        datasets: []
    }

    if (compareGearboxes) {
        graphData.datasets.push({
            label: GraphOptions.Automat,
            data: [],
            backgroundColor: GRAPH_PALETTE.automatColor
        })
        graphData.datasets.push({
            label: GraphOptions.Mechanic,
            data: [],
            backgroundColor: GRAPH_PALETTE.mechanicColor
        })
    } else {
        graphData.datasets.push({
            label: GraphOptions.Filter,
            data: [],
            backgroundColor: GRAPH_PALETTE.mechanicColor
        })
    }

    graphData.datasets.push({
        label: GraphOptions.Total,
        data: [],
        backgroundColor: GRAPH_PALETTE.totalColor,
    })

    data
        .sort((a, b) => a.year - b.year)
        .forEach(({ year, count, countA, countM }) => {
            if (typeof countA === "undefined") return
            if (typeof countM === "undefined") return

            graphData.labels?.push(year)

            if (compareGearboxes) {
                graphData.datasets[0].data.push(countA)
                graphData.datasets[1].data.push(countM)
                graphData.datasets[2].data.push(count - countA - countM)
            } else {
                graphData.datasets[0].data.push(countA + countM)
                graphData.datasets[1].data.push(count - countA - countM)
            }
        })

    return graphData
}

export default getGraphData;
