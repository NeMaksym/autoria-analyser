import { RegionData } from "types/searchTypes";
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
    data: RegionData[],
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
                label: "Оголошень з коробкою автомат",
                data: [],
                backgroundColor: GRAPH_PALETTE.automatColor
            },
            {
                label: 'Оголошень з ручною коробкою',
                data: [],
                backgroundColor: GRAPH_PALETTE.mechanicColor
            },
            {
                label: 'Загалом на ринку',
                data: [],
                backgroundColor: GRAPH_PALETTE.totalColor
            },
        ].forEach(item => graphData.datasets.push(item))
    } else {
        [
            {
                label: 'Всього оголошень (на основі фільтрів)',
                data: [],
                backgroundColor: GRAPH_PALETTE.mechanicColor
            },
            {
                label: 'Загалом на ринку',
                data: [],
                backgroundColor: GRAPH_PALETTE.totalColor
            },
        ].forEach(item => graphData.datasets.push(item))
    }

    data
        .sort((a, b) => a.count - b.count)
        .forEach(({ name, count, countA, countM }) => {
            if (typeof countA === "undefined") return
            if (typeof countM === "undefined") return

            graphData.labels.push(name)

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
