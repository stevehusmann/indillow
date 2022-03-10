import React from 'react';
import GoogleMapReact from 'google-map-react';
import { useDispatch, useSelector } from 'react-redux';
import { CircleFill } from 'react-bootstrap-icons';
import styled from 'styled-components';
import { Card, Spinner, Popover, OverlayTrigger} from 'react-bootstrap';
import { Paper, requirePropFactory, Typography, useMediaQuery} from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import useStyles from './styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import JobDetails from '../JobDetails/JobDetails';



const Map = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(min-width: 600px');
  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  let jobs = useSelector((state) => state.jobs);

  const renderJobThumbnail = (job) => {
    
  }

  if (jobs.length > 0) {
    return (
      <div className={classes.mapContainer}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY}}
          defaultCenter={{lat: Number(jobs[0].location.lat), lng: Number(jobs[0].location.lng)}}
          center={{lat: Number(jobs[0].location.lat), lng: Number(jobs[0].location.lng)}}
          defaultZoom={13}
          margin={[50,50,50,50]}
          options={{minZoom:12, maxZoom:18}}
          onChange={(e) => {
            console.log(e);
          }}
          onChildClick={(child) => {}}
        >
          {jobs?.map((job) => (
            <div
              className={classes.markerContainer}
              lat={Number(job.location.lat)}
              lng={Number(job.location.lng)}
              key={job.key}
            >
              <OverlayTrigger
                placement="top"
                overlay={
                  <JobThumbnail id="button-tooltip">
                    <Popover.Body>
                      <strong>{job.jobTitle}</strong><br />
                      <small>{job.company}</small><br />
                      {job.salary}
                    </Popover.Body>
                  </JobThumbnail>
                }
              >
                <JobMarker size={17}/>
              </OverlayTrigger>
            </div>
          ))}
        </GoogleMapReact>
      </div>
    );
  } else {
    return (
      <LoadingSpinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">Loading...</span>
      </LoadingSpinner>
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
const LoadingSpinner = styled(Spinner)`
align-items: center;
justify-content: center;
display: flex;
`
const JobThumbnail = styled(Popover)`
background-color: white;
border-radius: 0px;
box-shadow:0px 0px 6px grey;

`