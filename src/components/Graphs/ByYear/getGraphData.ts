import { ByYearRes } from "types/searchTypes";

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
                backgroundColor: 'rgba(53, 162, 235, 0.3)'
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
                backgroundColor: 'rgba(53, 162, 235, 0.3)'
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
