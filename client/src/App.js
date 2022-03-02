import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import Header from './components/Header/Header';
import JobList from './components/JobList/JobList';
import Map from './components/Map/Map';


const App = () => {


  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{width: '100%'}}>
        <Grid item xs={12} md={9}>
          <Map />
        </Grid>
        <Grid item xs={12} md={3}>
          <JobList />
        </Grid>
      </Grid>
    </>

  );
}

export default App;