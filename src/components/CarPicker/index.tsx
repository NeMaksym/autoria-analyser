import { Grid } from '@mui/material';

import { Gearbox } from 'types/searchTypes';
import { FilterValues } from 'types/filterTypes';
import Column from 'components/CarPicker/Column/Column';

interface Props {
    filters: FilterValues
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function ({ filters }: Props) {
    return (
        <Grid container spacing={2}>
            <Grid item md={6}>
                <Column filters={filters} gearbox={Gearbox.mechanic} title="Механіка" />
            </Grid>
            <Grid item md={6}>
                <Column filters={filters} gearbox={Gearbox.auto} title="Автомат" />
            </Grid>
        </Grid>
    )
}
