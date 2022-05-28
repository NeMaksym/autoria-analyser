import { useEffect } from 'react';
import { Grid } from '@mui/material';

import Column from 'components/CarPicker/Column/Column';
import { CustomParams, Gearbox } from 'types/searchParamsTypes';

interface Props {
    filters: CustomParams
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function ({ filters }: Props) {
    const controller = new AbortController();

    useEffect(() => {
        return () => { controller.abort("CarPicker page is unmounted") }
    }, [])

    return (
        <Grid container spacing={2}>
            <Grid item sm={6}>
                <Column
                    title="Механіка"
                    filters={filters}
                    gearbox={Gearbox.mechanic}
                    controller={controller}
                />
            </Grid>
            <Grid item sm={6}>
                <Column
                    title="Автомат"
                    filters={filters}
                    gearbox={Gearbox.auto}
                    controller={controller}
                />
            </Grid>
        </Grid>
    )
}
