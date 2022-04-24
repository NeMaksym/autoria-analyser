import { Grid } from '@mui/material';
import Filters from 'components/Filters';
import ByYearGraph from 'components/Graphs/ByYear/ByYearGraph';
import ByRegionGraph from 'components/Graphs/ByRegion/ByRegionGraph'

function App() {
  return (
    <Grid container spacing={2} sx={{ p: '32px', pt: '48px' }}>
      <Grid item>
        <Filters />
      </Grid>
      <Grid item xs={12}>
        <ByYearGraph />
      </Grid>
      <Grid item xs={12}>
        <ByRegionGraph />
      </Grid>
    </Grid>
  );
}

export default App;
