import { Grid } from '@mui/material';

import Column from 'components/CarPicker/Column/Column';
import { CustomParams, Gearbox } from 'types/searchParamsTypes';

interface Props {
    filters: CustomParams
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function ({ filters }: Props) {
    return (
        <Grid container spacing={2}>
            <Grid item sm={6}>
                <Column filters={filters} gearbox={Gearbox.mechanic} title="Механіка" />
            </Grid>
            <Grid item sm={6}>
                <Column filters={filters} gearbox={Gearbox.auto} title="Автомат" />
            </Grid>
        </Grid>
    )
}
