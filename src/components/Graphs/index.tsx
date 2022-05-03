import { useState } from 'react';
import { Grid } from '@mui/material';

import { CustomParams } from 'types/searchParamsTypes';
import ByModel from 'components/Graphs/ByModel/ByModel';
import ByYearGraph from 'components/Graphs/ByYear/ByYearGraph';
import ByBrandGraph from 'components/Graphs/ByBrand/ByBrandGraph';
import ByRegionGraph from 'components/Graphs/ByRegion/ByRegionGraph';

interface Params {
    filters: CustomParams,
    comapreGearboxes: boolean
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function ({ filters, comapreGearboxes }: Params): JSX.Element {
    const [activeBrandId, setActiveBrandId] = useState<number | undefined>(undefined)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <ByYearGraph filters={filters} compareGearboxes={comapreGearboxes} />
            </Grid>
            <Grid item xs={12}>
                <ByRegionGraph filters={filters} compareGearboxes={comapreGearboxes} />
            </Grid>
            <Grid item xs={12}>
                <ByBrandGraph
                    filters={filters}
                    compareGearboxes={comapreGearboxes}
                    setActiveBrandId={setActiveBrandId}
                />
            </Grid>
            <Grid item xs={12}>
                <ByModel
                    filters={filters}
                    compareGearboxes={comapreGearboxes}
                    activeBrandId={activeBrandId}
                />
            </Grid>
        </Grid>
    )
}