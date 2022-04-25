import { useState } from 'react';
import { Grid } from '@mui/material';
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
    compareGearboxes: false,
  })

  return (
    <Grid container spacing={2} sx={{ p: '32px', pt: '48px' }}>
      <Grid item>
        <Filters filters={filters} setFilters={setFilters} />
      </Grid>
      <Grid item xs={12}>
        <ByYearGraph filters={filters} />
      </Grid>
      <Grid item xs={12}>
        <ByRegionGraph filters={filters} />
      </Grid>
      <Grid item xs={12}>
        <ByBrandGraph filters={filters} />
      </Grid>
    </Grid>
  );
}

export default App;
