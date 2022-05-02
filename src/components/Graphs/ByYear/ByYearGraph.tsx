import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

import Search from 'classes/Search';
import SearchParams from 'classes/SearchParams';
import { FilterValues } from 'types/filterTypes';
import getGraphData from 'components/Graphs/ByYear/getGraphData';
import getGraphOptions from 'components/Graphs/ByYear/getGraphOptions';
import ErrorMsg from 'components/ErrorMsg/ErrorMsg';
import PendingMsg from 'components/PendingMsg/PendingMsg';

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

const ByYearGraph = ({ filters, compareGearboxes }: Props) => {
    const [data, setData] = useState({})
    const [isError, setIsError] = useState(false)
    const [isPending, setIsPending] = useState(false)

    useEffect(() => {
        let isCanceled = false

        const searchParams = new SearchParams(filters)

        setIsError(false)
        setIsPending(true)

        new Search()
            .byYear(searchParams)
            .then(data => {
                if (!isCanceled) setData(data)
            })
            .catch(() => {
                if (!isCanceled) setIsError(true)
            })
            .finally(() => {
                if (!isCanceled) setIsPending(false)
            })

        return () => { isCanceled = true }
    }, [filters])

    if (isError) return <ErrorMsg />
    if (isPending) return <PendingMsg />

    return (
        <Bar
            options={getGraphOptions(data)}
            data={getGraphData(data, compareGearboxes)}
            height={80}
        />
    )

}

export default ByYearGraph
