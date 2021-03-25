import { Modal, Button } from 'react-bootstrap';

const TransactionReceipt = (props) => {

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="modal-receipt-color" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        {tokenId}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body modal-receipt-color" closeButton>
        <div className="modal-receipt-image-div">
          <img className="modal-receipt-image" src="./images/garage.jpg" alt="garage" />
        </div>
      </Modal.Body>
    </Modal>

  );
};

export default TransactionReceipt;
