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
}

const ByRegionGraph = ({ filters, compareGearboxes }: Props) => {
    const [data, setData] = useState<RegionData[]>([])
    const [isError, setIsError] = useState<boolean>(false)
    const [isPending, setIsPending] = useState<boolean>(false)

    useEffect(() => {
        let isCanceled = false

        const searchParams = new SearchParams(filters)

        setIsError(false)
        setIsPending(true)

        new Search()
            .byRegion(searchParams)
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
        <Box sx={{ height: '365px', minWidth: '1000px' }}>
            <Bar
                options={getGraphOptions(data)}
                data={getGraphData(data, compareGearboxes)}
            />
        </Box>
    )
}

export default ByRegionGraph
