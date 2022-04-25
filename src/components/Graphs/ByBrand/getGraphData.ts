import { ByBrandRes } from "types/searchTypes";

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
    data: ByBrandRes,
    compareGearboxes: boolean
) => BarData;

const getGraphData: GetGraphData = (data, compareGearboxes) => {
    const graphData: BarData = {
        labels: [],
        datasets: []
    }

    if (compareGearboxes) {
        graphData.datasets
            .push({
                label: "Automat",
                data: [],
                backgroundColor: `rgb(255, 99, 132)`
            })

        graphData.datasets.push({
            label: 'Mechanic',
            data: [],
            backgroundColor: 'rgb(75, 192, 192)'
        })
    } else {
        graphData.datasets.push({
            label: 'Total',
            data: [],
            backgroundColor: 'rgb(75, 192, 192)'
        })
    }

    Object.entries(data)
        .sort((a, b) => {
            const totalA = a[1].countFilterA + a[1].countFilterM
            const totalB = b[1].countFilterA + b[1].countFilterM

            return totalA - totalB
        })
        .slice(Object.keys(data).length - 25)
        .forEach(brandEntrie => {
            const { name, countFilterA, countFilterM } = brandEntrie[1]

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