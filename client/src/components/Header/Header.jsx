import React from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './styles';

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <img src="indillow-logo.png" alt="logo" className={classes.logo} />
        <Box display="flex">
        <Typography variant="h6" className={classes.title}>
          find hourly jobs on a map
        </Typography>
        {/* <Autocomplete> */}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase placeholder="Search..." classes={{ root: classes.inputRoot, input: classes.inputInput }}/>
          </div>
        {/* </Autocomplete> */}
        </Box>
      </Toolbar>
    </AppBar>
    );
}

export default Header;