import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

import Search from 'classes/Search';
import { ModelDataOrigin } from 'types/searchTypes';
import SearchParams from 'classes/SearchParams';
import { FilterValues } from 'types/filterTypes';
import ErrorMsg from 'components/ErrorMsg/ErrorMsg';
import PendingMsg from 'components/PendingMsg/PendingMsg';
import getGraphData from 'components/Graphs/ByModel/getGraphData';
import getGraphOptions from 'components/Graphs/ByModel/getGraphOptions';

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
    compareGearboxes: boolean,
    activeBrandId: string | undefined,
}

const ByBrandGraph = ({ filters, compareGearboxes, activeBrandId }: Props) => {
    const [data, setData] = useState<ModelDataOrigin[]>([])
    const [isError, setIsError] = useState(false)
    const [isPending, setIsPending] = useState(false)

    useEffect(() => {
        let isCanceled = false

        if (activeBrandId) {
            const searchParams = new SearchParams(filters)

            setIsError(false)
            setIsPending(true)

            new Search()
                .byModel(searchParams, activeBrandId)
                .then(data => {
                    if (!isCanceled) setData(data)
                })
                .catch(() => {
                    if (!isCanceled) setIsError(true)
                })
                .finally(() => {
                    if (!isCanceled) setIsPending(false)
                })
        }

        return () => { isCanceled = true }
    }, [filters, activeBrandId])

    if (!activeBrandId) return <h2>Оберіть бренд авто натиснувши на стовпчик ☝️</h2>
    if (isError) return <ErrorMsg />
    if (isPending) return <PendingMsg />

    return (
        <Bar
            options={getGraphOptions()}
            data={getGraphData(data, compareGearboxes)}
            height={80}
        />
    )
}

export default ByBrandGraph
