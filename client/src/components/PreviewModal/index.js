import React from "react";
import {Link} from "react-router-dom";
import Auth from "../../utils/auth";
import { Container, Text, Button, Modal, useModal } from '@nextui-org/react';
import '../../styles/Modals.css'


function PreviewModal (props) {

  return(
    
    <Modal
      id="preview-modal"
      scroll
      blur
      closeButton
      open={props.visible}
      width="600px"
      aria-labelledby="preview-modal-title"
      aria-describedby="preview-modal-description"
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Modal with a lot of content
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text id="modal-description"></Text>
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