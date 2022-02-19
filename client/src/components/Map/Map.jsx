import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery} from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';

import useStyles from './styles';

const Map = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(min-width: 600px');
  const coordinates = {lat: 30.527700, lng: -97.670970};

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDBs-tlaOvJUsBZ6JqFd3IieijQ-Pnga5g'}}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={15}
        margin={[50,50,50,50]}
        // options={''}
        // onChange={''}
        // onChildClick={''}
      >
      </GoogleMapReact>
    </div>
  );
}

export default Map;