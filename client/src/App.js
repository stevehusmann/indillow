import { BrowserRouter,Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Container, Spinner, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { CssBaseline, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import JobList from './components/JobList/JobList';
import Map from './components/Map/Map';
import HomePage from './components/HomePage';

const App = () => {
  let jobs = useSelector(state => state.jobs);
  let query = useSelector((state) => state.searchTerms.query);
  let location = useSelector((state) => state.searchTerms.location);
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
              {(jobs.byKey.length > 0) 
              ? 
                <Grid container spacing={3} style={{width: '100%'}}>
                <Grid item xs={12} md={8}>
                  <Map />
                </Grid>
                <Grid item xs={12} md={4}>
                  <JobList />
                </Grid>
                </Grid>                  
              : 
               <>
               <SpinnerContainer>

                  <Spinner animation="border" role="status" variant="primary">
                  <span className="visually-hidden">Loading...</span>
                  </Spinner>

                  <h3>Searching on indeed.com for {query} jobs in {location}...</h3>

                </SpinnerContainer>

              </>
              } 
            </>
          }
          />
        </Routes>
      </BrowserRouter>        
    </>

  );
}

export default App;

const SpinnerContainer = styled(Container)`
display: fixed;
background-color: white;
height: 90vh;
align-items: center;
justify-content: center;
`