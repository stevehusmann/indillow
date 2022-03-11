import React, { useEffect, useState } from 'react';
// import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, InputBase, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs, setSearchTerms } from '../../actions';
import useStyles from './styles';

const Header = () => {
  let query = useSelector((state) => state.searchTerms.query);
  let location = useSelector((state) => state.searchTerms.location);
  let radius = 0;

  const [tempQuery, setTempQuery] = useState('');
  const [tempLocation, setTempLocation] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    dispatch(fetchJobs(`https://indeed.com/jobs?q=${query}&l=${location}&radius=${radius}`, controller));
    return () => {
      controller.abort();
    };
  }, [dispatch, query, location, radius]);
  
  const handleSubmitClick = () =>{
    dispatch(setSearchTerms(tempQuery, tempLocation));
  }

  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar} >
        <img src="indillow-logo.png" alt="logo" className={classes.logo} />

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase placeholder="Job title, keywords, or company" classes={{ root: classes.inputRoot, input: classes.inputInput }} onChange={e => setTempQuery(e.target.value)}/>
          </div>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase placeholder="City or zip code" classes={{ root: classes.inputRoot, input: classes.inputInput }} onChange={e => setTempLocation(e.target.value)}/>
          </div>

          <Button variant="contained" type="submit" onClick={handleSubmitClick}>Search</Button>


      </Toolbar>
    </AppBar>
    );
}

export default Header;