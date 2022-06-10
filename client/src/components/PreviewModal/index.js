import React from "react";
import {Link} from "react-router-dom";
import Auth from "../../utils/auth";
import { Container, Text, Button, Modal, useModal } from '@nextui-org/react';
import '../../styles/Modals.css'


function PreviewModal (props) {

  return(
    
    <Modal
      id="preview-passage-modal"
      scroll
      blur
      closeButton
      open={props.previewPassageModalVisible}
      width="600px"
      aria-labelledby="preview-passage-modal-title"
      aria-describedby="preview-passage-modal-description"
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          {props.modalTitle} ... id number {props.modalId}
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text id="modal-description">{props.modalBody}</Text>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onClick={() => props.closeHandler()}>
          Close
        </Button>
        <Button auto color="primary" onClick={() => props.addToListHandler()}>
          Add to My List
        </Button>
      </Modal.Footer>
    </Modal>
    )
}

export default PreviewModal;
