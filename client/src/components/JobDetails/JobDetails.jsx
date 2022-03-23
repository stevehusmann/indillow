import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Container, Row, Col, Modal} from 'react-bootstrap';
import { setCurrentPopup } from '../../actions';
import styled from 'styled-components';
import axios from 'axios';
const ROOT_URL = "http://localhost:8000";

const JobDetails = ({ job }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState('false');
  // const fetchJobDetails = (URL) => {
  //   axios.post(`${ROOT_URL}/jobdetails`, {URL: URL})
  //   .then(function (response) {
  //     return response.data;
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   })
  // }

  async function JobDetailsModal (job) {
    // const jobDetails = await fetchJobDetails(job.link);
    // console.log(jobDetails);
    // const jobDetailsHTML = jobDetails.jobDetailsHTML;
    // const applyLink = jobDetails.applyLink;
    // console.log(applyLink);
    return (
      <Modal
      centered
      >
          <Container fluid>
            <Row>
              {job.logo ? <Col xl='3'sm='1'><Logo src={job.logo ? job.logo : null}/></Col> : null}
              <Col>
                <h5>{job.jobTitle}</h5>
                <h6>{job.company}</h6>
                <h6><small className="text-muted">{job.address}</small></h6>
                {job.salary ? <h6><strong>{job.salary}</strong></h6> : null}

              </Col>
            </Row>
          </Container>
      </Modal>
    )
  }


  return (
      <>
      <JobCard
      onMouseEnter={() => dispatch(setCurrentPopup(job.placeId))}
      onMouseLeave={() => dispatch(setCurrentPopup(null))}
      onClick={()=> setShowModal(true)}
      >
        <Card.Body>
          <Container fluid>
            <Row>
              {job.logo ? <Col xl='3'sm='1'><Logo src={job.logo ? job.logo : null}/></Col> : null}
              <Col>
                <h5>{job.jobTitle}</h5>
                <h6>{job.company}</h6>
                <h6><small className="text-muted">{job.address}</small></h6>
                {job.salary ? <h6><strong>{job.salary}</strong></h6> : null}
                {}
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </JobCard>
      <JobDetailsModal 
      job={job}
      show={showModal}
      onHide={() => setShowModal(false)}
      />
      </>
  );
}

export default JobDetails;

const JobCard = styled(Card)`
  background-color: white;
  display: block;
  line-height: normal;
  cursor: pointer;
  border-radius: 5px;
  box-shadow:0px 0px 6px lightgrey;
  margin: auto;
  padding: 5px;       
  &:hover {
    box-shadow:0px 0px 6px #2557a7;
    background-color: #fdfdfd;
  }
`
const Logo = styled.img`
width: 80%;
border-radius: 3px;
`