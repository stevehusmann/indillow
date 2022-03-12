import React from 'react';
import { Card, Container, Row, Col} from 'react-bootstrap';
import styled from 'styled-components';

const JobDetails = ({ job }) => {
  return (
      <JobCard>

        <Card.Body>
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
        </Card.Body>
      </JobCard>
  );
}

export default JobDetails;

const JobCard = styled(Card)`
  background-color: white;
  line-height: normal;
  cursor: pointer;
  border-radius: 5px;
  box-shadow:0px 0px 6px lightgrey;
  margin: auto;
  &:hover {
    box-shadow:0px 0px 6px #2557a7;
    background-color: #fdfdfd;
  }
`
const Logo = styled.img`
width: 80%;
border-radius: 3px;
`