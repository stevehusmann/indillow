import React from 'react';
import GoogleMapReact from 'google-map-react';
import { useDispatch, useSelector } from 'react-redux';
import { CircleFill } from 'react-bootstrap-icons';
import styled from 'styled-components';
import { Container, Row, Col, Popover, OverlayTrigger, Modal} from 'react-bootstrap';
import { setCurrentPopup, setCurrentModal} from '../../actions';
import useStyles from './styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import JobDetailListModal from '../JobDetailListModal';

const Map = () => {

  const classes = useStyles();
  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  let jobs = useSelector((state) => state.jobs);
  let currentPopup = useSelector((state) => state.currentPopup);
  const dispatch = useDispatch();
  const [currentPlaceId, setCurrentPlaceId] = React.useState('');
  const [jobDetailList, setJobDetailList] = React.useState([]);

  const jobClickHandler = (placeId) => {

    if (jobs.byPlaceId[placeId].length > 1){
      setJobDetailList(jobs.byPlaceId[placeId]);
      setCurrentPlaceId(placeId);
    }
    else {
      dispatch(setCurrentModal(jobs.byPlaceId[placeId][0].key, jobs.byPlaceId[placeId][0].link))
    }
  }

  return (
    <div className={classes.mapContainer}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY}}
          defaultCenter={{lat: Number(jobs.byKey[0].location.lat), lng: Number(jobs.byKey[0].location.lng)}}
          center={{lat: Number(jobs.byKey[0]?.location.lat), lng: Number(jobs.byKey[0]?.location.lng)}}
          defaultZoom={13}
          margin={[50,50,50,50]}
          onChildClick={(child) => {}}
        >
          {Object.keys(jobs.byPlaceId).map(placeId => (
            <div
              className={classes.markerContainer}
              lat={jobs.byPlaceId[placeId][0].location.lat ? Number(jobs.byPlaceId[placeId][0].location.lat) : null} 
              lng={jobs.byPlaceId[placeId][0].location.lng ? Number(jobs.byPlaceId[placeId][0].location.lng) : null}
              key={placeId}
              onClick={()=> jobClickHandler(placeId)}
            >
              <OverlayTrigger
                show={(currentPopup === placeId)}
                placement="top"
                overlay={
                  <JobThumbnail id="button-tooltip">
                    <Container>
                        {
                          jobs.byPlaceId[placeId].map((job,i) => {
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
                              {(i + 1 === jobs.byPlaceId[placeId].length) ? null : <Line />}
                            </>
                            );
                          })
                        }
                    </Container>
                  </JobThumbnail>
                  
                }
              >
                <JobTrigger
                onMouseEnter={() => dispatch(setCurrentPopup(placeId))}
                onMouseLeave={() => dispatch(setCurrentPopup(null))}
                >
                <Label>{(jobs.byPlaceId[placeId].length > 1) ? jobs.byPlaceId[placeId].length : null}</Label>
                <JobMarker size={18}/>
                </JobTrigger>
          </OverlayTrigger>
          <div onClick={e => e.stopPropagation()}>
            <JobDetailListModal 
                jobArray = {jobDetailList}
                show = {placeId === currentPlaceId}
                animation = {false}
                onHide={() => setCurrentPlaceId(null)}
                onClick={() => setCurrentPlaceId(null)}
              />
          </div>
        </div>
          )
          
          )}
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