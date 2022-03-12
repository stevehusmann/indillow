import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Container, Row } from 'react-bootstrap';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import JobDetails from '../JobDetails/JobDetails';
import useStyles from './styles';
import styled from 'styled-components';


const JobList = (props) => {
  let query = useSelector((state) => state.searchTerms.query);
  let location = useSelector((state) => state.searchTerms.location);
  let jobs = useSelector((state) => state.jobs);
  const classes = useStyles();

if(jobs.length > 0){
  return (
    <div className={classes.container}>
      {/* <FormControl className={classes.formControl}>
      </FormControl> */}
      <h4>We found {jobs.length} {query} jobs in <strong>{location}</strong>.</h4><br />
      <Grid container spacing={2} className={classes.list}>
        
        {jobs?.map((job) => (
          <Grid item key={job.key} xs={12}>
            <JobDetails job={job} />
          </Grid>
        ))}
      </Grid>
    </div>
    );
} else {
  return (
    <SpinnerContainer>
    <Row>
      <Spinner animation="border" role="status" variant="primary">
      <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Row>
  </SpinnerContainer>
  )
}

}

export default JobList;

const SpinnerContainer = styled(Container)`
display: flex;
background-color: white;
height: 90vh;
align-items: center;
justify-content: center;
`