import { BrandData } from "types/searchTypes";
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
    data: BrandData[],
    compareGearboxes: boolean
) => BarData;

const getGraphData: GetGraphData = (data, compareGearboxes) => {
    const graphData: BarData = {
        labels: [],
        datasets: []
    }

    if (compareGearboxes) {
        graphData.datasets.push({
            label: "Оголошень з коробкою автомат",
            data: [],
            backgroundColor: GRAPH_PALETTE.automatColor
        })

        graphData.datasets.push({
            label: 'Оголошень з ручною коробкою ',
            data: [],
            backgroundColor: GRAPH_PALETTE.mechanicColor
        })
    } else {
        graphData.datasets.push({
            label: 'Всього оголошень (на основі фільтрів)',
            data: [],
            backgroundColor: GRAPH_PALETTE.mechanicColor
        })
    }

    data
        .sort((a, b) => a.count - b.count)
        .slice(data.length - 25)
        .forEach(({ name, countA, countM }) => {
            if (!countA || !countM) return

            graphData.labels.push(name)

            if (compareGearboxes) {
                graphData.datasets[0].data.push(countA)
                graphData.datasets[1].data.push(countM)
            } else {
                graphData.datasets[0].data.push(countA + countM)
            }
        })

    return graphData
}

export default getGraphData;
