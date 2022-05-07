import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';

import { CustomParams } from 'types/searchParamsTypes';
import ByModel from 'components/Graphs/ByModel/ByModel';
import ByYearGraph from 'components/Graphs/ByYear/ByYearGraph';
import ByBrandGraph from 'components/Graphs/ByBrand/ByBrandGraph';
import ByRegionGraph from 'components/Graphs/ByRegion/ByRegionGraph';

interface Params {
    filters: CustomParams
    comapreGearboxes: boolean
    showRegionGraph: boolean
}

const CustomGridContainer = styled(Grid)(() => ({
    '& .MuiGrid-item': {
        paddingLeft: 0,
        marginLeft: '16px',
        overflowX: 'scroll'
    }
}))

// eslint-disable-next-line import/no-anonymous-default-export
export default function ({
    filters,
    comapreGearboxes,
    showRegionGraph
}: Params): JSX.Element {
    const [activeBrandId, setActiveBrandId] = useState<number | undefined>(undefined)

    return (
        <CustomGridContainer container spacing={2}>
            <Grid item xs={12} container justifyContent="center">
                <Typography variant='h4'>
                    Кількість пропозицій
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='h5'>
                    За роком випуску
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <ByYearGraph filters={filters} compareGearboxes={comapreGearboxes} />
            </Grid>

            {
                showRegionGraph && (
                    <>
                        <Grid item xs={12}>
                            <Typography variant='h5'>
                                За регіоном
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <ByRegionGraph filters={filters} compareGearboxes={comapreGearboxes} />
                        </Grid>
                    </>
                )
            }

            <Grid item xs={12}>
                <Typography variant='h5'>
                    За маркою
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <ByBrandGraph
                    filters={filters}
                    compareGearboxes={comapreGearboxes}
                    setActiveBrandId={setActiveBrandId}
                />
            </Grid>

            {
                activeBrandId && (
                    <Grid item xs={12}>
                        <Typography variant='h5'>
                            За моделлю
                        </Typography>
                    </Grid>
                )
            }
            <Grid item xs={12}>
                <ByModel
                    filters={filters}
                    compareGearboxes={comapreGearboxes}
                    activeBrandId={activeBrandId}
                />
            </Grid>
        </CustomGridContainer>
    )
}