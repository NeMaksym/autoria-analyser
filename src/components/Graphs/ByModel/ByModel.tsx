import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

import Search from 'classes/Search';
import { ModelData } from 'types/searchTypes';
import SearchParams from 'classes/SearchParams';
import ErrorMsg from 'components/ErrorMsg/ErrorMsg';
import { CustomParams } from 'types/searchParamsTypes';
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
    filters: CustomParams
    compareGearboxes: boolean
    activeBrandId: number | undefined
    controller: AbortController
}

const ByBrandGraph = ({ filters, compareGearboxes, activeBrandId, controller }: Props) => {
    const [data, setData] = useState<ModelData[]>([])
    const [isError, setIsError] = useState<boolean>(false)
    const [isPending, setIsPending] = useState<boolean>(false)

    useEffect(() => {
        if (activeBrandId) {
            const searchParams = new SearchParams(filters)

            setIsError(false)
            setIsPending(true)

            new Search()
                .byModel(searchParams, activeBrandId, controller)
                .then(data => {
                    if (!controller.signal.aborted) setData(data)
                })
                .catch(() => {
                    if (!controller.signal.aborted) setIsError(true)
                })
                .finally(() => {
                    if (!controller.signal.aborted) setIsPending(false)
                })
        }
    }, [filters, activeBrandId])

    if (!activeBrandId) return <h2>Оберіть марку авто натиснувши на стовпчик ☝️</h2>
    if (isError) return <ErrorMsg />
    if (isPending) return <PendingMsg />

    return (
        <Box sx={{ height: '365px', minWidth: '1000px' }}>
            <Bar
                options={getGraphOptions()}
                data={getGraphData(data, compareGearboxes)}
            />
        </Box>
    )
}

export default ByBrandGraph
