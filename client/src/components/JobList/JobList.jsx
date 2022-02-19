import React, { useState, useEffect } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

import { getWagesFromJobListings } from '../../api';
import JobDetails from '../JobDetails/JobDetails';
import useStyles from './styles';

const JobList = (props) => {
  
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    getWagesFromJobListings()
      .then((data) => {
        setJobList(data.list);
        })
  }, []);


  const classes = useStyles();
  const [type,setType] = useState('all');


  return (
    <div className={classes.container}>
      <FormControl className={classes.formControl}>
        <InputLabel>Show</InputLabel>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <MenuItem value="all">All Wage Rates</MenuItem>
          <MenuItem value="jobs">Job Listings</MenuItem>
          <MenuItem value="reported">Self-Reported Wage Rates</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3} className={classes.list}>
        {jobList?.map((job, i) => (
          <Grid item key={i} xs={12}>
            <JobDetails job={job} />
          </Grid>
        ))}
      </Grid>
    </div>
    );
}

export default JobList;