import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

import Search from 'classes/Search';
import SearchParams from 'classes/SearchParams';
import { FilterValues } from 'types/filterTypes';
import getGraphData from 'components/Graphs/ByBrand/getGraphData';
import getGraphOptions from 'components/Graphs/ByBrand/getGraphOptions';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface Props {
    filters: FilterValues
    compareGearboxes: boolean
}

const ByBrandGraph = ({ filters, compareGearboxes }: Props) => {
    const [data, setData] = useState({})
    const [isError, setIsError] = useState(false)
    const [isPending, setIsPending] = useState(false)

    useEffect(() => {
        const searchParams = new SearchParams(filters)

        setIsError(false)
        setIsPending(true)

        new Search()
            .byBrand(searchParams)
            .then(data => setData(data))
            .catch(() => setIsError(true))
            .finally(() => setIsPending(false))
    }, [filters])

    if (isError) return <h2>Something went wrong. Try again later</h2>
    if (isPending) return <h2>Loading...</h2>

    return (
        <Bar
            options={getGraphOptions()}
            data={getGraphData(data, compareGearboxes)}
            height={80}
        />
    )
}

export default ByBrandGraph
