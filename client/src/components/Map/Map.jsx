import React from 'react';
import GoogleMapReact from 'google-map-react';
import { useDispatch, useSelector } from 'react-redux';
import { GeoAltFill } from 'react-bootstrap-icons';
import { Paper, requirePropFactory, Typography, useMediaQuery} from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import useStyles from './styles';



const Map = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(min-width: 600px');
  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  let jobs = useSelector((state) => state.jobs);
  console.log(jobs);

  if (jobs.length > 0) {
    return (
      <div className={classes.mapContainer}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY}}
          defaultCenter={{lat: Number(jobs[0].location.lat), lng: Number(jobs[0].location.lng)}}
          center={{lat: Number(jobs[0].location.lat), lng: Number(jobs[0].location.lng)}}
          defaultZoom={13}
          margin={[50,50,50,50]}
          // options={''}
          // onChange={''}
          // onChildClick={''}
        >
          {jobs?.map((job) => (
            <div
              className={classes.markerContainer}
              lat={Number(job.location.lat)}
              lng={Number(job.location.lng)}
              key={job.key}
            >
            <GeoAltFill color='royalblue' size={30}/>
            </div>
          ))}
        </GoogleMapReact>
      </div>
    );
  } else {
    return (
      <h1>Loading...</h1>
    )
  }
}

export default Map;