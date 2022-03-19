import React from 'react';
import { useSelector } from 'react-redux';
import { Spinner, Container, Row } from 'react-bootstrap';
import { Grid } from '@material-ui/core';
import JobDetails from '../JobDetails/JobDetails';
import useStyles from './styles';
import styled from 'styled-components';



const JobList = (props) => {
  let query = useSelector((state) => state.searchTerms.query);
  let location = useSelector((state) => state.searchTerms.location);
  let jobs = useSelector((state) => state.jobs);
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h4>We found {jobs.byKey.length} {query} jobs in <strong>{location}</strong>.</h4><br />
      <Grid container spacing={2} className={classes.list}>
        
        {jobs.byKey.map((job) => (
          <Grid item key={job.key} xs={12}>
            <JobDetails 
            job={job} 
            />
          </Grid>
        ))}
      </Grid>
    </div>
    );
}

export default JobList;

