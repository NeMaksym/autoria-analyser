import { useState, useEffect, useRef, Dispatch, SetStateAction, MouseEvent } from 'react';
import { Chart, getElementAtEvent } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

import Search from 'classes/Search';
import { ByBrandRes } from 'types/searchTypes';
import SearchParams from 'classes/SearchParams';
import { FilterValues } from 'types/filterTypes';
import getGraphData from 'components/Graphs/ByBrand/getGraphData';
import getGraphOptions from 'components/Graphs/ByBrand/getGraphOptions';
import PendingMsg from 'components/PendingMsg/PendingMsg';
import ErrorMsg from 'components/ErrorMsg/ErrorMsg';

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
    setActiveBrandId: Dispatch<SetStateAction<string | undefined>>
}

const ByBrandGraph = ({ filters, compareGearboxes, setActiveBrandId }: Props) => {
    const [data, setData] = useState<ByBrandRes>({})
    const [isError, setIsError] = useState(false)
    const [isPending, setIsPending] = useState(false)

    const chartRef = useRef<ChartJS>(null);

    useEffect(() => {
        const searchParams = new SearchParams(filters)

        setIsError(false)
        setIsPending(true)
        setActiveBrandId(undefined)

        new Search()
            .byBrand(searchParams)
            .then(data => setData(data))
            .catch(() => setIsError(true))
            .finally(() => setIsPending(false))
    }, [filters, setActiveBrandId])

    if (isError) return <ErrorMsg />
    if (isPending) return <PendingMsg />

    const graphData = getGraphData(data, compareGearboxes)

    return (
        <Chart
            type='bar'
            ref={chartRef}
            options={getGraphOptions()}
            data={graphData}
            height={80}
            onClick={(event: MouseEvent<HTMLCanvasElement>) => {
                if (!chartRef.current) return

                const { index } = getElementAtEvent(chartRef.current, event)[0];
                const label = graphData.labels[index];

                const id = Object.keys(data).find(brandId => data[brandId].name === label)

                setActiveBrandId(id)
            }}
        />
    )
}

export default ByBrandGraph
