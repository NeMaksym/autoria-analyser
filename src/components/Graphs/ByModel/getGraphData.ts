import { ModelData } from "types/searchTypes";
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
    data: ModelData[],
    compareGearboxes: boolean
) => BarData;

const getGraphData: GetGraphData = (data, compareGearboxes) => {
    const graphData: BarData = {
        labels: [],
        datasets: []
    }

    if (compareGearboxes) {
        graphData.datasets.push({
            label: "Оголошень з АКПП",
            data: [],
            backgroundColor: GRAPH_PALETTE.automatColor
        })

        graphData.datasets.push({
            label: 'Оголошень з МКПП',
            data: [],
            backgroundColor: GRAPH_PALETTE.mechanicColor
        })
    } else {
        graphData.datasets.push({
            label: 'Всього (на основі фільтрів)',
            data: [],
            backgroundColor: GRAPH_PALETTE.mechanicColor
        })
    }

    data = data
        .sort((a, b) => {
            const totalA = a.countFilterA + a.countFilterM
            const totalB = b.countFilterA + b.countFilterM

            return totalA - totalB
        })
        .filter(model => !model.isGroup)

    if (data.length > 25) data = data.slice(data.length - 25)

    data.forEach(({ name, countFilterA, countFilterM }) => {
        graphData.labels.push(name)

        if (compareGearboxes) {
            graphData.datasets[0].data.push(countFilterA)
            graphData.datasets[1].data.push(countFilterM)
        } else {
            graphData.datasets[0].data.push(countFilterA + countFilterM)
        }
    })

    return graphData
}

export default getGraphData;
