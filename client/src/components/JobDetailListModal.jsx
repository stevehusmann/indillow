import { Modal, Card, Row, Col, Container} from 'react-bootstrap';
import { setCurrentModal } from '../actions';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const JobDetailListModal = (props) => {
const dispatch = useDispatch();

return (
  <Modal
  {...props}
  size="sm"
  aria-labelledby="contained-modal-title-vcenter"
  centered
>
  <Modal.Header closeButton />
  <Container>
  {
    props.jobArray.map((job) => {
    return(
      <Card key={job.key}>
        <Row>
          {job.logo ? <LogoCol xs={4}><LogoThumbnail src={job.logo} /></LogoCol> : null}
          <Col>
          {job.company}<br />
          <strong>{job.jobTitle}</strong><br />
          {job.salary ? <small>{job.salary}<br /></small> : null }
          </Col>                            
        </Row>
        <Row>
          <RelTime>{job.formattedRelativeTime}</RelTime>
        </Row>
      </Card>
      );
    })
  }
  </Container>

</Modal>

)

}

export default JobDetailListModal;

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