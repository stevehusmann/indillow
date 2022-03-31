import { Modal, Card, Row, Col, Container} from 'react-bootstrap';
import { setCurrentModal } from '../actions';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const JobDetailListModal = (props) => {
const dispatch = useDispatch();

return (
  <JobDetailList
  {...props}
  size = "md"
  aria-labelledby="contained-modal-title-vcenter"
  centered
>
    <Modal.Header >
      <h5 id="contained-modal-title-vcenter" className="text-muted">
        There are {props.jobArray.length} jobs at {props.jobArray[0]?.address}.
      </h5>
    </Modal.Header>
  {
    props.jobArray.map((job) => {
    return(
      <JobCard
      key={job.key + job.placeId}
      onClick={()=> dispatch(setCurrentModal(job.key, job.link))}
      >
        <Modal.Body >
          <Container fluid>
            <Row>
              {job.logo ? <LogoCol xl='3'sm='1'><LogoThumbnail src={job.logo ? job.logo : null}/></LogoCol> : null}
              <Col>
                <h5>{job.jobTitle}</h5>
                <h6>{job.company}</h6>
                {job.salary ? <h6><strong>{job.salary}</strong></h6> : null}
                <RelTime>{job.formattedRelativeTime}</RelTime>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </JobCard>
      
      );
    })
  }

</JobDetailList>

)

}

export default JobDetailListModal;

const JobDetailList = styled(Modal)`
margin-bottom: 10px;
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

const RelTime = styled.small`
display:block;
text-align: right;
`

const JobCard = styled(Card)`
  background-color: white;
  display: block;
  line-height: normal;
  cursor: pointer;
  border-radius: 5px;
  box-shadow:0px 0px 6px lightgrey;
  margin: 10px 10px 10px 10px;
  padding: 5px;       
  &:hover {
    box-shadow:0px 0px 6px #2557a7;
    background-color: #fdfdfd;
  }
`