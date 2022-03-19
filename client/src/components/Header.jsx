import React, { useEffect, useState } from 'react';
// import { Autocomplete } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs, setSearchTerms } from '../actions';
import { Form, Row, Col, Container, Button, ProgressBar} from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Header = () => {
  let query = useSelector((state) => state.searchTerms.query);
  let location = useSelector((state) => state.searchTerms.location);
  let radius = 0;
  let progress = useSelector((state) => state.progress);

  const [tempQuery, setTempQuery] = useState(query);
  const [tempLocation, setTempLocation] = useState(location);

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
    if (!(tempQuery === query && tempLocation === location) && !(tempQuery && tempLocation === '')){
      dispatch(setSearchTerms(tempQuery, tempLocation));
    }
  }

  return (
    <TopBar fluid >
      <Row className="align-items-center">

        <Col >
          <Form>
            <Row>
              <Col sm={2}>
                <Link to='/'>
                    <IndillowLogo src="indillow-logo.png" alt="logo"/>
                </Link>    
              </Col>
              <Col sm={3}>
                <SearchField 
                type="text"
                placeholder= "Job title, keywords, or company"
                onChange={e => setTempQuery(e.target.value)}
                />
              </Col>
              <Col sm={3}>
                <SearchField
                type="text"
                placeholder= "City or zip code"
                onChange={e => setTempLocation(e.target.value)}
                />
              </Col>
              <Col sm={2}>
                <FindJobsButton 
                type="submit"
                onClick={handleSubmitClick}
                >
                  Find jobs
                </FindJobsButton>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <ScrapeProgressBar animated now={progress}/>
    </TopBar>

    );
}

const ScrapeProgressBar = styled(ProgressBar).attrs(props => ({
  
}))`

`

const TopBar = styled(Container)`
background-color: #efefef;
// border: 2px solid lightgrey;
box-shadow:0px 0px 6px lightgrey;
padding: 10px;
`
const IndillowLogo = styled.img`
min-width: 100px;
width: 100%;
max-width: 160px;
`

const FindJobsButton = styled(Button)`
font-weight: 800;
background-color: #2557a7;
margin: 5px;

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
margin: 5px;
`


export default Header;

