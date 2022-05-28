import { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { groupBy, Dictionary } from 'lodash';

import Search from 'classes/Search';
import { CarOption } from 'types/searchTypes';
import SearchParams from 'classes/SearchParams';
import ErrorMsg from 'components/ErrorMsg/ErrorMsg';
import PendingMsg from 'components/PendingMsg/PendingMsg';
import { CustomParams, Gearbox } from 'types/searchParamsTypes';
import YearSection from 'components/CarPicker/YearSection/YearSection';

interface Props {
    filters: CustomParams
    gearbox: Gearbox
    title: string
    controller: AbortController
}

const Column = ({ filters, gearbox, title, controller }: Props) => {
    const [data, setData] = useState<Dictionary<CarOption[]>>({})
    const [isError, setIsError] = useState(false)
    const [isPending, setIsPending] = useState(false)

    useEffect(() => {
        const searchParams = new SearchParams(filters)

        setIsError(false)
        setIsPending(true)
        setData({})

        new Search()
            .carPicker(searchParams, gearbox, controller)
            .then(data => {
                if (!controller.signal.aborted) setData(groupBy(data, 'year'))
            })
            .catch(() => {
                if (!controller.signal.aborted) setIsError(true)
            })
            .finally(() => {
                if (!controller.signal.aborted) setIsPending(false)
            })
    }, [filters, gearbox])

    return (
        <Grid container spacing={2}>
            <Grid container item xs={12} justifyContent="center">
                <Typography variant="h5">
                    {title}
                </Typography>
            </Grid>
            {
                isError
                    ? (
                        <Grid item xs={12}>
                            <ErrorMsg />
                        </Grid>
                    )
                    : isPending
                        ? (
                            <Grid item xs={12}>
                                <PendingMsg />
                            </Grid>
                        )
                        : !Object.keys(data).length
                            ? (
                                <Grid item xs={12}>
                                    <Typography variant="h6">
                                        Нічого не знайдено. Спропуйте змінити параметри
                                    </Typography>
                                </Grid>
                            )
                            : Object.keys(data)
                                .sort((a, b) => Number(b) - Number(a))
                                .map(year => (
                                    <Grid key={year} item xs={12}>
                                        <YearSection
                                            year={year}
                                            models={data[year]}
                                            filters={filters}
                                            gearbox={gearbox}
                                        />
                                    </Grid>
                                ))
            }
        </Grid >
    )
}

export default Column
