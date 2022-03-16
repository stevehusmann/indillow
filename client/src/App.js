import { BrowserRouter,Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import Header from './components/Header';
import JobList from './components/JobList/JobList';
import Map from './components/Map/Map';
import HomePage from './components/HomePage';

const App = () => {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
          path="/results"
          element={
            <>
              <Header />
              <Grid container spacing={3} style={{width: '100%'}}>
              <Grid item xs={12} md={8}>
                <Map />
              </Grid>
              <Grid item xs={12} md={4}>
                <JobList />
              </Grid>
              </Grid>    
            </>
          }
          />
        </Routes>
      </BrowserRouter>        
    </>

  );
}

export default App;