import { useState } from 'react';
import { Grid } from '@mui/material';
import { Routes, Route, Navigate } from "react-router-dom";

import Graphs from 'components/Graphs';
import Info from 'components/Info/Info';
import Filters from 'components/Filters';
import CarPicker from 'components/CarPicker';
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

      <Grid container spacing={4} sx={{ p: '32px' }}>
        <Grid item xs={12}>
          <Filters
            filters={filters}
            setFilters={setFilters}
            compareGearboxes={comapreGearboxes}
            setCompareGearboxes={setCompareGearboxes}
          />
        </Grid>

        <Grid item xs={12}>
          <Routes>
            <Route path="/graphs" element={<Graphs filters={filters} comapreGearboxes={comapreGearboxes} />} />
            <Route path="/carpicker" element={<CarPicker filters={filters} />} />
            <Route path="*" element={<Navigate to="graphs" />} />
          </Routes>
        </Grid>

        <Grid item md={12}>
          <Info />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
