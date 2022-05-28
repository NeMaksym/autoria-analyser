import { useState, useEffect, useRef, Dispatch, SetStateAction, MouseEvent } from 'react';
import { Box } from '@mui/material';
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
    controller: AbortController
}

const ByBrandGraph = ({ filters, compareGearboxes, setActiveBrandId, controller }: Props) => {

    const [data, setData] = useState<BrandData[]>([])
    const [isError, setIsError] = useState<boolean>(false)
    const [isPending, setIsPending] = useState<boolean>(false)

    const chartRef = useRef<ChartJS>(null);

    useEffect(() => {
        const searchParams = new SearchParams(filters)

        setIsError(false)
        setIsPending(true)
        setActiveBrandId(undefined)

        new Search()
            .byBrand(searchParams, controller)
            .then(data => {
                if (!controller.signal.aborted) setData(data)
            })
            .catch(() => {
                if (!controller.signal.aborted) setIsError(true)
            })
            .finally(() => {
                if (!controller.signal.aborted) setIsPending(false)
            })
    }, [filters])

    if (isError) return <ErrorMsg />
    if (isPending) return <PendingMsg />

    const graphData = getGraphData(data, compareGearboxes)

    return (
        <Box sx={{ height: '365px', minWidth: '1000px' }}>
            <Chart
                type='bar'
                ref={chartRef}
                options={getGraphOptions()}
                data={graphData}
                onClick={(event: MouseEvent<HTMLCanvasElement>) => {
                    if (!chartRef.current) return

                    const { index } = getElementAtEvent(chartRef.current, event)[0];
                    const label = graphData.labels[index];

                    const id = data.find(({ name }) => name === label)?.id

                    setActiveBrandId(id)
                }}
            />
        </Box>
    )
}

export default ByBrandGraph
