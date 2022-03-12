import React from 'react';
import { Card, Container, Row, Col} from 'react-bootstrap';
import styled from 'styled-components';

const JobDetails = ({ job }) => {
  return (
      <JobCard>
          <Card.Header as="h6">{job.jobTitle}</Card.Header>
        <Card.Body>
          <Container fluid>
            <Row>
              {job.logo ? <Col xl='3'sm='1'><Logo src={job.logo ? job.logo : null}/></Col> : null}
              <Col>
                {job.salary ? <Card.Text>{job.salary}</Card.Text> : null}
                <Card.Text><strong>{job.company}</strong></Card.Text>
                <Card.Text><small className="text-muted">{job.address}</small></Card.Text>
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
  // padding: 20px 15px;
  cursor: pointer;
  border-radius: 5px;
  box-shadow:0px 0px 6px lightgrey;
  margin: auto;
  &:hover {
    box-shadow:0px 0px 6px darkblue;
    background-color: #fdfdfd;
  }
`
const Logo = styled.img`
width: 80%;
border-radius: 3px;
`