import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

import Search from 'classes/Search';
import { ModelData } from 'types/searchTypes';
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
    const [data, setData] = useState<ModelData[]>([])
    const [isError, setIsError] = useState(false)
    const [isPending, setIsPending] = useState(false)

    useEffect(() => {
        if (activeBrandId) {
            const searchParams = new SearchParams(filters)

            setIsError(false)
            setIsPending(true)

            new Search()
                .byModel(searchParams, activeBrandId)
                .then(data => setData(data))
                .catch(() => setIsError(true))
                .finally(() => setIsPending(false))
        }
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
