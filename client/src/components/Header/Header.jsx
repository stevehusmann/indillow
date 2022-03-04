import React, { useEffect, useState } from 'react';
// import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../../actions';
import useStyles from './styles';
import axios from 'axios';

const Header = () => {
  // let query = useSelector((state) => state.searchTerms.query);
  // let location = useSelector((state) => state.searchTerms.query);
  // let radius = 0;
  const ROOT_URL = "http://localhost:8000";
  let query = "Cook";
  let location = "Round%20Rock%2C%20TX";
  let radius = 0;

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchJobs(`https://indeed.com/jobs?q=${query}&l=${location}&radius=${radius}`));
      axios.get(`${ROOT_URL}/pages?q=${query}&l=${location}&radius=${radius}`)
      .then(function (response) {
        const linkArray = response.data;
        if (linkArray) {
          linkArray.map(link => {
            return dispatch(fetchJobs(link));
          });
        }
      });
  }, [dispatch, query, location, radius]);
  
  // const handleSubmitClick 

  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <img src="indillow-logo.png" alt="logo" className={classes.logo} />

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase placeholder="Job title, keywords, or company" classes={{ root: classes.inputRoot, input: classes.inputInput }}/>
          </div>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase placeholder="City, state, or zip code" classes={{ root: classes.inputRoot, input: classes.inputInput }}/>
          </div>

          <Button variant="contained" type="submit" >Search</Button>


      </Toolbar>
    </AppBar>
    );
}

export default Header;