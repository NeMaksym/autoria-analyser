import { useState } from 'react';
import { Grid } from '@mui/material';
import { Routes, Route, Navigate } from "react-router-dom";

import Graphs from 'components/Graphs';
import Info from 'components/Info/Info';
import Filters from 'components/Filters';
import TopBar from 'components/TopBar/TopBar';
import { FilterValues } from 'types/filterTypes';

function App() {
  const [filters, setFilters] = useState<FilterValues>({
    price_do: 10000,
    engineVolumeTo: undefined,
    's_yers[0]': undefined,
  })
  const [comapreGearboxes, setCompareGearboxes] = useState<boolean>(false)

  return (
    <>
      <TopBar />
      <Grid container spacing={2} sx={{ p: '32px' }}>
        <Grid item md={12}>
          <Filters
            filters={filters}
            setFilters={setFilters}
            compareGearboxes={comapreGearboxes}
            setCompareGearboxes={setCompareGearboxes}
          />
        </Grid>

        <Routes>
          <Route path="/graphs" element={<Graphs filters={filters} comapreGearboxes={comapreGearboxes} />} />
          <Route path="/autoselect" element={<h2>Nothing here yet</h2>} />
          <Route path="*" element={<Navigate to="graphs" />} />
        </Routes>

        <Grid item md={12}>
          <Info />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
