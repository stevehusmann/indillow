import React, { useEffect, useState } from 'react';
// import { Autocomplete } from '@react-google-maps/api';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs, setSearchTerms } from '../actions';
import { Form, Row, Col, Container, Button} from 'react-bootstrap';
import styled from 'styled-components';

const HomePage = () => {
  let navigate = useNavigate();
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
    
    if (!(tempQuery == query && tempLocation == location)){
      dispatch(setSearchTerms(tempQuery, tempLocation));
    }
    navigate(`/results`);
  }

  return (
    <HomePageContainer fluid>

      <TopRow>
        <IndillowLogo src="indillow-logo.png" alt="logo"/>
      </TopRow>

      <HomePageForm>
        <SearchField
        size="lg"
        type="text"
        placeholder= "Job title, keywords, or company"
        onChange={e => setTempQuery(e.target.value)}
        />

        <SearchField
        size="lg"
        type="text"
        placeholder= "City or zip code"
        onChange={e => setTempLocation(e.target.value)}
        />

        <FindJobsButton 
        type="submit"
        onClick={handleSubmitClick}
        >
          Find jobs
        </FindJobsButton>

      </HomePageForm>
    </HomePageContainer>
    );
}

const TopRow = styled(Row)`
background-color: white;
box-shadow:0px 0px 6px lightgrey;
padding: 10px;
`

const HomePageContainer = styled(Container)`
background-image: url("https://images.unsplash.com/photo-1520950237264-dfe336995c34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2847&q=80")


`

const HomePageForm = styled(Form)`
margin: auto;
width: 40%;

`

const IndillowLogo = styled.img`
max-width: 200px;
display: block;
margin-left: auto;
margin-right: auto;
width: 40%;
`

const FindJobsButton = styled(Button)`
font-weight: 800;
background-color: #2557a7;
padding: 10px 30px;
margin-top: 20px;
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
margin: auto;
&:focus {
  box-shadow:0px 0px 6px #2557a7;
}
margin-top: 20px;
`

export default HomePage;