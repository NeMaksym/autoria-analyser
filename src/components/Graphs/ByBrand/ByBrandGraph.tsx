import { useState, useEffect, useRef, Dispatch, SetStateAction, MouseEvent } from 'react';
import { Chart, getElementAtEvent } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

import Search from 'classes/Search';
import { BrandData } from 'types/searchTypes';
import SearchParams from 'classes/SearchParams';
import ErrorMsg from 'components/ErrorMsg/ErrorMsg';
import { CustomParams } from 'types/searchParamsTypes';
import PendingMsg from 'components/PendingMsg/PendingMsg';
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
    filters: CustomParams
    compareGearboxes: boolean
    setActiveBrandId: Dispatch<SetStateAction<number | undefined>>
}

const ByBrandGraph = ({ filters, compareGearboxes, setActiveBrandId }: Props) => {
    const [data, setData] = useState<BrandData[]>([])
    const [isError, setIsError] = useState<boolean>(false)
    const [isPending, setIsPending] = useState<boolean>(false)

    const chartRef = useRef<ChartJS>(null);

    useEffect(() => {
        let isCanceled = false

        const searchParams = new SearchParams(filters)

        setIsError(false)
        setIsPending(true)
        setActiveBrandId(undefined)

        new Search()
            .byBrand(searchParams)
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

                const id = data.find(({ name }) => name === label)?.id

                setActiveBrandId(id)
            }}
        />
    )
}

export default ByBrandGraph
