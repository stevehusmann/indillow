import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
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
      <h4>We found {jobs.length} {query} jobs in {location}.</h4><br />
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
    <LoadingSpinner animation="border" role="status" variant="primary">
    <span className="visually-hidden">Loading...</span>
  </LoadingSpinner>
  )
}

}

export default JobList;

const LoadingSpinner = styled(Spinner)`
align-items: center;
justify-content: center;
display: flex;
`