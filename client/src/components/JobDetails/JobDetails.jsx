import React from 'react';
import { Card, Container, Row, Col} from 'react-bootstrap';
import styled from 'styled-components';

const JobDetails = ({ job }) => {
  return (
      <JobCard>
          <Card.Header as="h5">{job.jobTitle}</Card.Header>
        <Card.Body>
          <Container fluid>
            <Row>
              <Col xl='9'>
                <Card.Text>{job.salary ? job.salary : <span />}</Card.Text>
                <Card.Text><strong>{job.company}</strong></Card.Text>
                <Card.Text><small className="text-muted">{job.address}</small></Card.Text>
              </Col>
              <Col xl='3'sm='1'>
                <Logo src={job.logo ? job.logo : null}/>
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
    background-color: #eeeeee;
  }
`
const Logo = styled.img`
width: 80%;
border-radius: 3px;
`