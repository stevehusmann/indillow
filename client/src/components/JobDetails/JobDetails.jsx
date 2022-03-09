import React from 'react';
import { Card, Container, Row, Col} from 'react-bootstrap';
import styled from 'styled-components';

const JobDetails = ({ job }) => {
  return (
    <>
      <JobCard>
        <Container fluid>
        <Row>
            <Col lg='3'>
              <Logo src={job.logo} alt=''/>
            </Col>
            <Col lg='9'>
              <h2>{job.jobTitle}</h2>
              <h4>{job.address}</h4>
              <h4>{job.company}</h4>
              <h4>{job.salary}</h4>
            </Col>
          </Row>
        </Container>
      </JobCard>
    </>
  );
}

export default JobDetails;

const JobCard = styled(Card)`
  background-color: white;
  padding: 10px 20px;

`
const Logo = styled.img`
// width: 100%;
`