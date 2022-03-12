import React, { useEffect, useState } from 'react';
// import { Autocomplete } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs, setSearchTerms } from '../actions';
import { Form, Row, Col, Container, Button} from 'react-bootstrap';
import styled from 'styled-components';

const Header = () => {
  let query = useSelector((state) => state.searchTerms.query);
  let location = useSelector((state) => state.searchTerms.location);
  let radius = 0;

  const [tempQuery, setTempQuery] = useState('');
  const [tempLocation, setTempLocation] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
      const controller = new AbortController();
      dispatch(fetchJobs(`https://indeed.com/jobs?q=${query}&l=${location}&radius=${radius}`, controller));
      return () => {
        controller.abort();
      };
  }, [dispatch, query, location, radius]);
  
  const handleSubmitClick = (event) =>{
    event.preventDefault();
    dispatch(setSearchTerms(tempQuery, tempLocation));
  }

  return (
    <TopBar fluid >
      <Row className="align-items-center">
        <Col sm={1}>
          <IndillowLogo src="indillow-logo.png" alt="logo"/>
        </Col>
        <Col sm={7}>
          <Form>
            <Row>
              <Col sm={5}>
                <SearchField 
                type="text"
                size="lg"
                placeholder="Job title, keywords, or company" 
                onChange={e => setTempQuery(e.target.value)}
                />
              </Col>
              <Col sm={5}>
                <SearchField
                type="text"
                size="lg"             
                placeholder="City or zip code" 
                onChange={e => setTempLocation(e.target.value)}
                />
              </Col>
              <Col sm={2}>
                <FindJobsButton 
                type="submit"
                size="lg"
                onClick={handleSubmitClick}
                >
                  Find jobs
                </FindJobsButton>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </TopBar>

    );
}

const TopBar = styled(Container)`
background-color: #efefef;
// border: 2px solid lightgrey;
box-shadow:0px 0px 6px lightgrey;
padding: 10px;
`
const IndillowLogo = styled.img`
width: 100%;
`
const FindJobsButton = styled(Button)`
font-weight: 800;
background-color: #2557a7;
width: 160px;
height: 46px;
&:hover {
  color: #2557a7;
  background-color: white;
}
&:focus {
  background-color: #2557a7;
  color: white;
  box-shadow:0px 0px 6px #2557a7;
}
`

const SearchField = styled(Form.Control)`
&:focus {
  box-shadow:0px 0px 6px #2557a7;
}

`


export default Header;

