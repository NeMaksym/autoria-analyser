import { Grid } from '@mui/material';
import Filters from 'components/Filters';

function App() {
  return (
    <Grid container spacing={2} sx={{ p: '32px', pt: '48px' }}>
      <Grid item>
        <Filters />
      </Grid>
      <Grid item xs={12}>
        {/* TODO: graphs */}
      </Grid>
    </Grid>
  );
}

export default App;
