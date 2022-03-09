import React from 'react';
import GoogleMapReact from 'google-map-react';
import { useDispatch, useSelector } from 'react-redux';
import { CircleFill } from 'react-bootstrap-icons';
import styled from 'styled-components';
import { Card } from 'react-bootstrap';
import { Paper, requirePropFactory, Typography, useMediaQuery} from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import useStyles from './styles';



const Map = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(min-width: 600px');
  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  let jobs = useSelector((state) => state.jobs);

  if (jobs.length > 0) {
    return (
      <div className={classes.mapContainer}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY}}
          defaultCenter={{lat: Number(jobs[0].location.lat), lng: Number(jobs[0].location.lng)}}
          center={{lat: Number(jobs[0].location.lat), lng: Number(jobs[0].location.lng)}}
          defaultZoom={13}
          margin={[50,50,50,50]}
          options={{minZoom:13, maxZoom:18}}
          onChange={(e) => {
            console.log(e);
          }}
          // onChildClick={''}
        >
          {jobs?.map((job) => (
            <div
              className={classes.markerContainer}
              lat={Number(job.location.lat)}
              lng={Number(job.location.lng)}
              key={job.key}
            >
            <JobMarker size={17}/>

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

const JobMarker = styled(CircleFill)`
color: royalblue; 
cursor: pointer;
border-color: white;
border-radius: 50%;
border-width: 2px;
border-style: solid;
box-shadow:0px 0px 4px grey;
&:hover {
  color: orangered;
}
`

const SalaryLabel = styled(Paper)`
background-color: white;
border-radius: 5px;
border-color: grey;
border-width: 1px;
border-style: solid;
font-weight: 800;
padding: 10px; 
display: flex;
flexDirection: column;
justifyContent: center;
visibility: hidden;
&:hover {
  visibility: visible;
}
`