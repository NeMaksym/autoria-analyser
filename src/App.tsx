import { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import Filters from 'components/Filters';
import ByYearGraph from 'components/Graphs/ByYear/ByYearGraph';
import ByRegionGraph from 'components/Graphs/ByRegion/ByRegionGraph'
import ByBrandGraph from 'components/Graphs/ByBrand/ByBrandGraph';
import { FilterValues } from 'types/filterTypes';

function App() {
  const [filters, setFilters] = useState<FilterValues>({
    price_do: 10000,
    engineVolumeTo: undefined,
    's_yers[0]': undefined,
  })
  const [comapreGearboxes, setCompareGearboxes] = useState<boolean>(false)

  return (
    <Grid container spacing={2} sx={{ p: '32px' }}>
      <Grid item xs={12}>
        <Typography
          variant='h4'
          component='h1'
          sx={{ fontFamily: 'Orelega One' }}
          children="autoRIA Analyser"
        />
      </Grid>
      <Grid item md={6}>
        <Filters
          filters={filters}
          setFilters={setFilters}
          compareGearboxes={comapreGearboxes}
          setCompareGearboxes={setCompareGearboxes}
        />
      </Grid>
      <Grid item xs={12}>
        <ByYearGraph filters={filters} compareGearboxes={comapreGearboxes} />
      </Grid>
      <Grid item xs={12}>
        <ByRegionGraph filters={filters} compareGearboxes={comapreGearboxes} />
      </Grid>
      <Grid item xs={12}>
        <ByBrandGraph filters={filters} compareGearboxes={comapreGearboxes} />
      </Grid>
    </Grid>
  );
}

export default App;
