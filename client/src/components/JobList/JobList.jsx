import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import JobDetails from '../JobDetails/JobDetails';
import useStyles from './styles';

const JobList = (props) => {
  let query = useSelector((state) => state.searchTerms.query);
  let location = useSelector((state) => state.searchTerms.location);
  let jobs = useSelector((state) => state.jobs);
  console.log(jobs);
  const classes = useStyles();

if(jobs.length > 0){
  return (
    <div className={classes.container}>
      {/* <FormControl className={classes.formControl}>
      </FormControl> */}
      <h3>We found {jobs.length} {query} jobs in {location}.</h3>
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
    <h1>Loading...</h1>
  )
}

}

export default JobList;