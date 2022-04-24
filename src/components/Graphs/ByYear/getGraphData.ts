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

const getGraphData = (data: ByYearRes): BarData => {
    const graphData: BarData = {
        labels: [],
        datasets: [
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
        ]
    }

    Object.entries(data).forEach(yearEntrie => {
        const [year, { countBase, countFilterA, countFilterM }] = yearEntrie

        graphData.labels?.push(year)
        graphData.datasets[0].data.push(countFilterA)
        graphData.datasets[1].data.push(countFilterM)
        graphData.datasets[2].data.push(countBase - countFilterA - countFilterM)
    })

    return graphData
}

export default getGraphData;
