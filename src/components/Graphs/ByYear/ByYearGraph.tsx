import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

import Search from 'classes/Search';
import SearchParams from 'classes/SearchParams';
import getGraphData from 'components/Graphs/ByYear/getGraphData';
import getGraphOptions from 'components/Graphs/ByYear/getGraphOptions';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ByYearGraph = () => {
    const [data, setData] = useState({})
    const [isError, setIsError] = useState(false)
    const [isPending, setIsPending] = useState(false)

    useEffect(() => {
        const searchParams = new SearchParams({
            price_do: 10000,
            engineVolumeTo: 2,
        })

        setIsError(false)
        setIsPending(true)

        new Search()
            .byYear(searchParams)
            .then(data => setData(data))
            .catch(() => setIsError(true))
            .finally(() => setIsPending(false))
    }, [])

    if (isError) return <h2>Something went wrong. Try again later</h2>
    if (isPending) return <h2>Loading...</h2>

    return <Bar options={getGraphOptions(data)} data={getGraphData(data)} height={80} />;

}

export default ByYearGraph
