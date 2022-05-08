import { useState } from 'react';
import { Grid } from '@mui/material';
import { Routes, Route, Navigate } from "react-router-dom";

import Pages from 'consts/pages';
import Graphs from 'components/Graphs';
import Info from 'components/Info/Info';
import Filters from 'components/Filters';
import CarPicker from 'components/CarPicker';
import TopBar from 'components/TopBar/TopBar';
import { CustomParams } from 'types/searchParamsTypes';

function App() {
  const [filters, setFilters] = useState<CustomParams>({})
  const [comapreGearboxes, setCompareGearboxes] = useState<boolean>(false)
  const [showRegionGraph, setShowRegionGraph] = useState<boolean>(false)

  return (
    <>
      <TopBar />

      <Grid container spacing={4} sx={{ p: '32px' }}>
        <Grid item xs={12}>
          <Filters
            setFilters={setFilters}
            compareGearboxes={comapreGearboxes}
            setCompareGearboxes={setCompareGearboxes}
            showRegionGraph={showRegionGraph}
            setShowRegionGraph={setShowRegionGraph}
          />
        </Grid>

        <Grid item xs={12}>
          <Routes>
            <Route
              path={Pages.graphs}
              element={
                <Graphs
                  filters={filters}
                  comapreGearboxes={comapreGearboxes}
                  showRegionGraph={showRegionGraph}
                />
              }
            />
            <Route path={Pages.carpicker} element={<CarPicker filters={filters} />} />
            <Route path="*" element={<Navigate to={Pages.graphs} />} />
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
