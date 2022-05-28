import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

import Search from 'classes/Search';
import { RegionData } from 'types/searchTypes';
import SearchParams from 'classes/SearchParams';
import ErrorMsg from 'components/ErrorMsg/ErrorMsg';
import { CustomParams } from 'types/searchParamsTypes';
import PendingMsg from 'components/PendingMsg/PendingMsg';
import getGraphData from 'components/Graphs/ByRegion/getGraphData';
import getGraphOptions from 'components/Graphs/ByRegion/getGraphOptions';

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
    controller: AbortController
}

const ByRegionGraph = ({ filters, compareGearboxes, controller }: Props) => {
    const [data, setData] = useState<RegionData[]>([])
    const [isError, setIsError] = useState<boolean>(false)
    const [isPending, setIsPending] = useState<boolean>(false)

    useEffect(() => {
        const searchParams = new SearchParams(filters)

        setIsError(false)
        setIsPending(true)

        new Search()
            .byRegion(searchParams, controller)
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

    return (
        <Box sx={{ height: '365px', minWidth: '1000px' }}>
            <Bar
                options={getGraphOptions(data)}
                data={getGraphData(data, compareGearboxes)}
            />
        </Box>
    )
}

export default ByRegionGraph
