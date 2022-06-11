import React, {useState} from "react";
import ReactDom from 'react-dom';
// import ReactDOM from 'react-dom';

import {
  Container,
  Text,
  Button,
  Table,
  Tooltip,
  Progress,
  Grid,
  Spacer,
  Modal
} from "@nextui-org/react";

export default function PreviewModal(props) {

  // if (!props.open) return null;

  return ReactDom.createPortal(
  <Modal
    id = "preview-body-modal"
    closeButton
    scroll
    width="600px"
    aria-labelledby="preview-body-modal"
    open={props.showPreviewModal}
    onClose={props.handlerToHidePreviewModal}
    >
    <Modal.Header>
      <Text h2>Preview this Passage</Text>
    </Modal.Header>
    <Modal.Body>
      <Text h4>This is the PASSAGE TITLE</Text>
      <Text>This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . </Text>
    </Modal.Body>
    <Modal.Footer>
      <Button auto flat color="secondary" onClick={props.handlerToPreviewModalCancelBtn}>
        Nope, nevermind. Not this one.
      </Button>
      <Button auto color="success" onClick={props.handlerToPreviewModalAddBtn}>
        Add it to My Queue
      </Button>
    </Modal.Footer>
  </Modal>,
  document.getElementById("portal")
  )
};
