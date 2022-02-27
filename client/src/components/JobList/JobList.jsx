import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import JobDetails from '../JobDetails/JobDetails';
import useStyles from './styles';

const JobList = (props) => {

  let jobs = useSelector((state) => state.jobs);
  console.log(jobs);
  const classes = useStyles();

if(Array.isArray(jobs)){
  return (
    <div className={classes.container}>
      <FormControl className={classes.formControl}>

      </FormControl>
      <Grid container spacing={3} className={classes.list}>
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