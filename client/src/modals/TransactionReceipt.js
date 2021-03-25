import { Modal, Button } from 'react-bootstrap';

const TransactionReceipt = (props) => {
  let cidUrl = props.cidLink;
  let metadataUrl = props.metadataUrl;
  console.log(props.tokenId)
  console.log(props.cidLink)
  console.log(props.metadataCidLink)

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="modal-receipt-color modal-receipt-data" closebutton>
        <div>
          Your token id is: <b>{props.tokenId}</b>
        </div>
        <div >
          <a className="modal-receipt-links"
            href= {cidUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Click here to view your Ricer on IPFS!
          </a>
        </div>
        <div >
          <a className="modal-receipt-links"
            href= {metadataUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Click for your Ricer's metadata
          </a>
        </div>
        <div >
          <a className="modal-receipt-links"
            href= {"https://ipfs.io/ipfs/bafkreifwhcrjyim63qp2qgvlltxg6v235e452teivljyh7jjl6v6i4w7sm"}
            target="_blank"
            rel="noopener noreferrer"
          >
            Click to see the transaction information
          </a>
        </div>
      </Modal.Body>

        <div className="modal-receipt-image-div">
          <img
            className="modal-receipt-image"
            src={cidUrl}
            alt="ricer"
          />
        </div>

      <div className="modal-receipt-color modal-receipt-footer">
        <Button className="modal-receipt-button" onClick={props.onHide} variant='info'>Close</Button>
      </div>

    </Modal>
  );
};

export default TransactionReceipt;

// <Modal.Body className="model-receipt-body modal-receipt-color">
//   <div className="modal-receipt-image-div">
//     <img
//       className="modal-receipt-image"
//       src={cidUrl}
//       alt="ricer"
//     />
//   </div>
// </Modal.Body>
