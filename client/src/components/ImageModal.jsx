import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import ReactJson from "@microlink/react-json-view";
import { useRef } from "react";
import { propTypes } from "react-bootstrap/esm/Image";

export default function ImportModal(props) {
  const imageRef = useRef();
  const reasonRef = useRef();

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{ background: "gainsboro" }}>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ width: "100%", textAlign: "center" }}
        >
          Image Request Center
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Which dockerhub image are you looking for?</h4>
        <Form.Control ref={imageRef} type="text"></Form.Control>
        <h4>Reasons for Request:</h4>
        <Form.Control ref={reasonRef} as="textarea" rows={3}></Form.Control>
      </Modal.Body>
      <Modal.Footer>
        <div style={{ margin: "auto" }}>
          <Button
            style={{ marginRight: "50px" }}
            onClick={async () => {
              props.onHide();
              // let response = await fetch(
              //   "https://039f22be-dbf3-4f9a-b96b-f0e72b7c408e.mock.pstmn.io/demo/start-app?name=" +
              //     imageRef.current.value,
              //   {
              //     method: "POST"
              //   }
              // );
              // response = await response.json();
              // console.log(response);
            }}
          >
            Submit
          </Button>
          <Button variant="warning" onClick={() => props.onHide()}>
            Cancel
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export function DangerModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{ background: "gainsboro" }}>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ width: "100%", textAlign: "center" }}
        >
          Do you want to remove selected app(s)?
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <div style={{ margin: "auto" }}>
          <Button
            style={{ marginRight: "50px" }}
            onClick={async () => {
              props.onHide();
              props.handleBatchPost(
                props.arrayofArrays,
                props.api,
                props.originalArray,
                props.newState
              );
            }}
          >
            Yes
          </Button>
          <Button variant="warning" onClick={() => props.onHide()}>
            No
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export function InspectModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{ background: "gainsboro" }}>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ width: "100%", textAlign: "center" }}
        >
          {props.id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ReactJson
          style={{
            textAlign: "left",
            wordBreak: "break-all"
          }}
          collapsed={false}
          src={props.src}
        />
      </Modal.Body>
    </Modal>
  );
}
