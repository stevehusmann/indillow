import React from 'react';
import GoogleMapReact from 'google-map-react';
import { useDispatch, useSelector } from 'react-redux';
import { CircleFill } from 'react-bootstrap-icons';
import styled from 'styled-components';
import { Container, Row, Col, Popover, OverlayTrigger} from 'react-bootstrap';
import { setCurrentPopup } from '../../actions';
import useStyles from './styles';
import 'bootstrap/dist/css/bootstrap.min.css';

const Map = () => {

  const classes = useStyles();
  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  let jobs = useSelector((state) => state.jobs);
  let currentPopup = useSelector((state) => state.currentPopup);
  const dispatch = useDispatch();
  return (
    <div className={classes.mapContainer}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY}}
          defaultCenter={{lat: Number(jobs.byKey[0].location.lat), lng: Number(jobs.byKey[0].location.lng)}}
          center={{lat: Number(jobs.byKey[0].location.lat), lng: Number(jobs.byKey[0].location.lng)}}
          defaultZoom={13}
          margin={[50,50,50,50]}
          // options={{minZoom:11, maxZoom:18}}
          onChange={(e) => {
            // console.log(e);
          }}
          onChildClick={(child) => {}}
        >
          {Object.keys(jobs.byPlaceId).map(jobArrayKey => (
            <div
              className={classes.markerContainer}
              lat={Number(jobs.byPlaceId[jobArrayKey][0].location.lat)}
              lng={Number(jobs.byPlaceId[jobArrayKey][0].location.lng)}
              key={jobArrayKey}
            >
              <OverlayTrigger
                show={(currentPopup === jobArrayKey)}
                placement="top"
                overlay={
                  <JobThumbnail id="button-tooltip">
                    <Container>
                        {
                          jobs.byPlaceId[jobArrayKey].map((job,i) => {
                          return(
                            <>
                              <Row>
                                {job.logo ? <LogoCol xs={4}><LogoThumbnail src={job.logo} /></LogoCol> : null}
                                <Col>
                                {job.company}<br />
                                <strong>{job.jobTitle}</strong><br />
                                {job.salary ? <small>{job.salary}<br /></small> : null }
                                </Col>                            
                              </Row>
                              <Row>
                                <RelTime>{job.formattedRelativeTime}</RelTime>
                              </Row>
                              {(i + 1 === jobs.byPlaceId[jobArrayKey].length) ? null : <Line />}
                            </>
                            );
                          })
                        }
                    </Container>
                  </JobThumbnail>
                }
              >
                <JobTrigger
                onMouseEnter={() => dispatch(setCurrentPopup(jobArrayKey))}
                onMouseLeave={() => dispatch(setCurrentPopup(null))}
                >
                <Label>{(jobs.byPlaceId[jobArrayKey].length > 1) ? jobs.byPlaceId[jobArrayKey].length : null}</Label>
                <JobMarker size={18}/>
                </JobTrigger>
          </OverlayTrigger>

          </div>
          ))}
        </GoogleMapReact>
      </div>
    );
  }


export default Map;

const JobMarker = styled(CircleFill)`
color: #006aff; 
cursor: pointer;
border-color: white;
border-radius: 50%;
border-width: 2px;
border-style: solid;
box-shadow:0px 0px 4px grey;

`

const JobTrigger = styled.div`
cursor: pointer;
&:hover {
  ${JobMarker} {
    color: orangered;
  }
}
`

const Label = styled.h6`
font-size: 12px;
font-weight: bold;
z-index: 1;
transform: translate(32%,172%);
color: white;
`

const JobThumbnail = styled(Popover)`
background-color: white;
border-radius: 0px;
box-shadow:0px 0px 6px grey;
padding: 10px 5px;
margin: auto;
vertical-align: center
`

const LogoCol = styled(Col)`
display: flex;
align-items: center;
`

const LogoThumbnail = styled.img`
width:100%;
margin: auto;
padding: 5px;
`

const Line = styled.hr`
margin-top: 10px;
margin-bottom: 10px;
`

const RelTime = styled.small`
display:block;
text-align: right;
`