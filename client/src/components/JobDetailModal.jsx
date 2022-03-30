import { Modal } from "react-bootstrap";


const JobDetailModal = (props) => {

return (
  <Modal
  {...props}
  size="lg"
  aria-labelledby="contained-modal-title-vcenter"
  centered
>
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        {props.job.jobTitle}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h6>{props.job.company}</h6>
      <h6><small className="text-muted">{props.job.address}</small></h6>
      {props.job.salary ? <h6><strong>{props.job.salary}</strong></h6> : null}
    </Modal.Body>

  </Modal>

)

}

export default JobDetailModal;