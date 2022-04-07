import { Modal, Button, Container, Row, Col, Spinner} from "react-bootstrap";
import styled from "styled-components";
import DOMPurify from 'dompurify';

const JobDescription = ({jobDescription}) => {
  const sanitizedJobDescription = () => ({
    __html: DOMPurify.sanitize(jobDescription)
  })
  return (
    <Container>
      <div
        dangerouslySetInnerHTML={sanitizedJobDescription()}
      />
      <br />
    </Container>
  );
}

const JobDetailModal = (props) => {

return (
  <JobDetail
  {...props}
  size="lg"
  aria-labelledby="contained-modal-title-vcenter"
  centered
  >

    {props.job.headerImageUrl ? 
    <Modal.Header><HeaderImg src={props.job.headerImageUrl}></HeaderImg> </Modal.Header> : null}
    <Modal.Body>
        <Row>
          {props.job.logo ? <Col xl='2'sm='1'><Logo src={props.job.logo ? props.job.logo : null}/></Col> : null}
          <Col>
            <h4><strong>{props.job.jobTitle}</strong></h4>      
            <h6>{props.job.company}</h6>
            <h6>{props.job.address}</h6>
            {props.job.jobTypes.length < 1 ? <h6>{props.job?.salary}</h6> : null}
            {props.job.jobTypes.length === 1 ? <h6>{props.job?.salary} - {props.job.jobTypes[0]}</h6> : null}
            {props.job.jobTypes.length > 1 ? <h6>{props.job?.salary} - {props.job.jobTypes.join(', ')}</h6> : null}
            {props.job.urgentlyHiring ? <h6><strong>Urgently Hiring</strong></h6> : null } 
          </Col>
        </Row>
        <br />
        {props.job.link ? 
        <ApplyButton onClick={() => window.open(props.job.link)}> Apply Now on indeed.com </ApplyButton> 
        : <ApplyButton disabled>
            <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            />
        <span>  Loading...</span>
        </ApplyButton>
        }

    </Modal.Body>
    <hr />
    {props.job.jobDescription ?
    <Modal.Body>
     <JobDescription jobDescription = {props.job.jobDescription} />
     <hr />
     <RelTime>{props.job.formattedRelativeTime}</RelTime>
    </Modal.Body>

    :
    <Modal.Body>
      <SpinnerContainer>
        <Spinner
          as="span"
          variant="primary"
          animation="border"
          role="status"
          aria-hidden="true"
        /> 
      </SpinnerContainer>
      <RelTime>{props.job.formattedRelativeTime}</RelTime>
    </Modal.Body>
    }

  </JobDetail>

)

}

export default JobDetailModal;

const HeaderImg = styled.img`
width: 100%;
border-radius: 3px;

`
const Logo = styled.img`
border-radius: 3px;
width: 100%;
`

const JobDetail = styled(Modal)`
`

const ApplyButton = styled(Button)`
font-weight: 800;
background-color: #2557a7;
width: 100%;
margin-bottom: 0px;
&:hover {
  color: white;
  background-color: #2557a7;
  box-shadow:0px 0px 6px #2557a7;
}
&:focus {
  background-color: #2557a7;
  color: white;
  box-shadow:0px 0px 6px #2557a7;
}
`
const RelTime = styled.small`
display:block;
text-align: right;
`

const SpinnerContainer = styled(Container)`
display: flex;
background-color: white;
align-items: center;
justify-content: center;
`