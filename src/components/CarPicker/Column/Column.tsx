import { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { groupBy, Dictionary } from 'lodash';

import Search from 'classes/Search';
import SearchParams from 'classes/SearchParams';
import { FilterValues } from 'types/filterTypes';
import ErrorMsg from 'components/ErrorMsg/ErrorMsg';
import { CarOption, Gearbox } from 'types/searchTypes';
import PendingMsg from 'components/PendingMsg/PendingMsg';
import YearSection from 'components/CarPicker/YearSection/YearSection';

interface Props {
    filters: FilterValues
    gearbox: Gearbox
    title: string
}

const Column = ({ filters, gearbox, title }: Props) => {
    const [data, setData] = useState<Dictionary<CarOption[]>>({})
    const [isError, setIsError] = useState(false)
    const [isPending, setIsPending] = useState(false)

    useEffect(() => {
        let isCancelled = false;

        const searchParams = new SearchParams(filters)

        setIsError(false)
        setIsPending(true)

        new Search()
            .carPicker(searchParams, gearbox)
            .then(data => {
                if (!isCancelled) {
                    let groupedData = groupBy(data, 'year')
                    setData(groupedData)
                }
            })
            .catch(() => {
                if (!isCancelled) setIsError(true)
            })
            .finally(() => {
                if (!isCancelled) setIsPending(false)
            })

        return () => { isCancelled = true }
    }, [filters, gearbox])

    return (
        <Grid container spacing={2}>
            <Grid container item xs={12} justifyContent="center">
                <Typography variant="h5">
                    {title}
                </Typography>
            </Grid>
            {
                isError && (
                    <Grid item xs={12}>
                        <ErrorMsg />
                    </Grid>
                )
            }
            {
                !isError && isPending && (
                    <Grid item xs={12}>
                        <PendingMsg />
                    </Grid>
                )
            }
            {
                !isError && !isPending && !Object.keys(data).length
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
                                <YearSection year={year} models={data[year]} />
                            </Grid>
                        ))
            }
        </Grid >
    )
}

export default Column
