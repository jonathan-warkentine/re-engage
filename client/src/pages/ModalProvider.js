import React from "react";
import ReactModal from "react-modal";
import { Container, Text, Textarea, Button, Table, Tooltip, Spacer, Card, Dropdown, Row, Modal, useModal, Input } from '@nextui-org/react';

/* const CustomModal = props => {
  const { isOpen } = props;
  // If we only put the modal in the render tree when it's open, multiple modals
  // will open in the expected order
  return isOpen ? <ReactModal {...props} /> : null;
};
 */
export default function ModalProvider() {

  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = React.useState(false);
  const handlerToShowConfirmDeleteModal = () => setShowConfirmDeleteModal(true);
  const handlerToCloseConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(false);
    console.log("CLOSE button pressed");
  };
  const handlerToConfirmDelete = () => {
    setShowConfirmDeleteModal(false);
    console.log("CONFIRM DELETE button pressed");
  };

  return (
    <div className="all-modals">
      
      <Modal
        closeButton
        aria-labelledby="confirm-delete-modal"
        open={showConfirmDeleteModal}
        onClose={handlerToCloseConfirmDeleteModal}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            TEST
            <Text b size={18}>
              NextUI
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={handlerToCloseConfirmDeleteModal}>
            Close
          </Button>
          <Button auto onClick={handlerToCloseConfirmDeleteModal}>
            Confirm DELETE
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};
