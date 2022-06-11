import React, {useState} from "react";
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
import {IconButton} from "../components/Icons/IconButton";
import {EyeIcon} from "../components/Icons/EyeIcon";
import {EditIcon} from "../components/Icons/EditIcon";
import {DeleteIcon} from "../components/Icons/DeleteIcon";
import {ResumeIcon} from "../components/Icons/ResumeIcon";
import "../styles/Dashboard.css";
import {useQuery} from "@apollo/client";
import {QUERY_ME} from "../utils/queries";
import PassageForm from '../components/PassageForm';
import PreviewModal from "../components/Modals/PreviewModal";

function Dashboard(props) {

// MODAL FUNCTIONS \/  \/  \/  \/  \/  \/  \/  \/  \/  \/
// PREVIEW Modal
const [showPreviewModal, setShowPreviewModal] = useState(false);
const handlerToShowPreviewModal = (passage) => {
  setShowPreviewModal(true);
  console.log(passage);
};
const handlerToHidePreviewModal = () => setShowPreviewModal(false);
const handlerToPreviewModalCancelBtn = () => {
  handlerToHidePreviewModal();
  console.log("Preview CANCEL button pressed");
};
const handlerToPreviewModalAddBtn = () => {
  handlerToHidePreviewModal();
  console.log("Preview ADD button pressed");
};

// EDIT Modal
const [showEditModal, setShowEditModal] = useState(false);
const handlerToShowEditModal = (passage) => {
  setShowEditModal(true);
  console.log(passage);
};
const handlerToHideEditModal = () => setShowEditModal(false);
const handlerToEditModalCancelBtn = () => {
  handlerToHideEditModal();
  console.log("Edit CANCEL button pressed");
};
const handlerToEditModalConfirmBtn = () => {
  handlerToHideEditModal();
  console.log("Edit CONFIRM button pressed");
};

// DELETE CONFIRM Modal
const [showDeleteModal, setShowDeleteModal] = useState(false);
const handlerToShowDeleteModal = (passage) => {
  setShowDeleteModal(true);
  console.log(passage);
};
const handlerToHideDeleteModal = () => setShowDeleteModal(false);
const handlerToDeleteModalCancelBtn = () => {
  handlerToHideDeleteModal();
  console.log("Delete CANCEL button pressed");
};
const handlerToDeleteModalConfirmBtn = () => {
  handlerToHideDeleteModal();
  console.log("Delete CONFIRM button pressed");
};

// ADD CONFIRM Modal
const [showAddModal, setShowAddModal] = useState(false);
const handlerToShowAddModal = (passage) => {
  setShowAddModal(true);
  console.log(passage);
};
const handlerToHideAddModal = () => setShowAddModal(false);
const handlerToAddModalCancelBtn = () => {
  handlerToHideAddModal();
  console.log("Add CANCEL button pressed");
};
const handlerToAddModalConfirmBtn = () => {
  handlerToHideAddModal();
  console.log("Add CONFIRM button pressed");
};
// MODAL FUNCTIONS ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ 


const {loading, data} = useQuery(QUERY_ME);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (data) {
    console.log(data.me?.sessions)
    return (
      <Container className="dashboard-container">
        <h2>Welcome to your Dashboard</h2>
        <Spacer y={3} />
  
        <Container className="my-contributions-box">
          <h3>My Contributions</h3>
          <Table
            bordered
            lined
            aria-label="list-of-contributions"
            css={{
              height: "auto",
              minWidth: "100%",
            }}
          >
            <Table.Header>
              <Table.Column width={6}>TITLE</Table.Column>
              <Table.Column width={3}>PROGRESS</Table.Column>
              <Table.Column width={3}>ACTIONS</Table.Column>
            </Table.Header>
            <Table.Body>
              {data.me.passages?.map((passage) => (
                <Table.Row key={passage.title}>
                  <Table.Cell>{passage.title}</Table.Cell>
                  <Table.Cell>
                    <Grid>
                      <Progress
                        color="primary"
                        value={
                          ( (data.me.sessions?.find(session => session.passage._id === passage._id)?.resumeAt /
                            passage.sentences?.length) * 100 ) || 0
                        }
                      />
                    </Grid>
                  </Table.Cell>
                  <Table.Cell>
                    <Tooltip color="primary" content="SHOW passage preview">
                      <IconButton
                        onClick={() => handlerToShowPreviewModal(passage)}
                      >
                        <EyeIcon size={20} fill="#979797" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip color="warning" content="EDIT passage">
                      <IconButton
                        onClick={() => handlerToShowEditModal(passage)}
                      >
                        <EditIcon size={20} fill="#979797" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip color="error" content="DELETE passage">
                      <IconButton
                        onClick={() => handlerToShowDeleteModal(passage)}
                      >
                        <DeleteIcon size={20} fill="#FF0080" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip color="success" content="RESUME passage">
                      <IconButton
                        onClick={() => handlerToShowAddModal(passage)}
                      >
                        <ResumeIcon size={20} fill="#00cc00" />
                      </IconButton>
                    </Tooltip>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Container>
  
        <Spacer y={3} />
  
        <Container className="current-engagements-box">
          <h3>My Current Engagments</h3>
          <Table
            bordered
            lined
            aria-label="list-of-contributions"
            css={{
              height: "auto",
              minWidth: "100%",
            }}
          >
            <Table.Header>
              <Table.Column width={6}>TITLE</Table.Column>
              <Table.Column width={6}>PROVIDED BY</Table.Column>
              <Table.Column width={3}>PROGRESS</Table.Column>
              <Table.Column width={3}>ACTIONS</Table.Column>
            </Table.Header>
            <Table.Body>
              {data.me.sessions?.map((session)=> (
                <Table.Row key={session.passage.title}>
                  <Table.Cell>{session.passage.title}</Table.Cell>
                  <Table.Cell>{session.passage.author.name}</Table.Cell>
                  <Table.Cell>
                    <Grid>
                      <Progress
                        color="primary"
                        value={
                          ((session.resumeAt /
                          session.passage.sentences?.length) * 100 ) || 0
                        }
                      />
                    </Grid>
                  </Table.Cell>
                  <Table.Cell>
                    <Tooltip color="primary" content="SHOW passage preview">
                      <IconButton
                        onClick={() => console.log("PREVIEW button clicked")}
                      >
                        <EyeIcon size={20} fill="#979797" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip color="success" content="RESUME passage">
                      <IconButton
                        onClick={() => console.log("RESUME button clicked")}
                      >
                        <ResumeIcon size={20} fill="#00cc00" />
                      </IconButton>
                    </Tooltip>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Container>
  
        <Spacer y={3} />
        <PassageForm />


{/* MODALS \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/ */}

  {/* Modal to PREVIEW */}
  {/* <Modal
    id = "preview-body-modal"
    closeButton
    scroll
    width="600px"
    aria-labelledby="preview-body-modal"
    open={showPreviewModal}
    onClose={handlerToHidePreviewModal}
    >
    <Modal.Header>
      <Text h2>Preview this Passage</Text>
    </Modal.Header>
    <Modal.Body>
      <Text h4>This is the PASSAGE TITLE</Text>
      <Text>This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . </Text>
    </Modal.Body>
    <Modal.Footer>
      <Button auto flat color="secondary" onClick={handlerToPreviewModalCancelBtn}>
        Nope, nevermind. Not this one.
      </Button>
      <Button auto color="success" onClick={handlerToPreviewModalAddBtn}>
        Add it to My Queue
      </Button>
    </Modal.Footer>
  </Modal> */}
  <PreviewModal
    showPreviewModal
    handlerToHidePreviewModal
    handlerToPreviewModalCancelBtn
    handlerToPreviewModalAddBtn
  />
  
  {/* Modal to EDIT */}
  <Modal
    id = "edit-body-modal"
    closeButton
    scroll
    width="600px"
    aria-labelledby="edit-body-modal"
    open={showEditModal}
    onClose={handlerToHideEditModal}
    >
    <Modal.Header>
      <Text h2>Edit this Passage</Text>
    </Modal.Header>
    <Modal.Body>
      <Text h4>This is the PASSAGE TITLE</Text>
      <Text>This is the PASSAGE BODY that will be EDITTED. . . . This is the PASSAGE BODY that will be EDITTED. . . . This is the PASSAGE BODY that will be EDITTED. . . . This is the PASSAGE BODY that will be EDITTED. . . . This is the PASSAGE BODY that will be EDITTED. . . . This is the PASSAGE BODY that will be EDITTED. . . . This is the PASSAGE BODY that will be EDITTED. . . . This is the PASSAGE BODY that will be EDITTED. . . . This is the PASSAGE BODY that will be EDITTED. . . . This is the PASSAGE BODY that will be EDITTED. . . . This is the PASSAGE BODY that will be EDITTED. . . . This is the PASSAGE BODY that will be EDITTED. . . . This is the PASSAGE BODY that will be EDITTED. . . . </Text>
    </Modal.Body>
    <Modal.Footer>
      <Button auto flat color="secondary" onClick={handlerToEditModalCancelBtn}>
        Nope, don't want to change it.
      </Button>
      <Button auto color="warning" onClick={handlerToEditModalConfirmBtn}>
        Yes, EDIT!
      </Button>
    </Modal.Footer>
  </Modal>
  
  {/* Modal to DELETE */}
  <Modal
    id = "confirm-delete-modal"
    closeButton
    aria-labelledby="confirm-delete-modal"
    open={showDeleteModal}
    onClose={handlerToHideDeleteModal}
  >
    <Modal.Header>
      <Text h2>Confirm Delete?!?</Text>
    </Modal.Header>
    <Modal.Body><Text h4>This is the body of MODAL 3</Text></Modal.Body>
    <Modal.Footer>
      <Button auto flat color="secondary" onClick={handlerToDeleteModalCancelBtn}>
        Nevermind, Go Back
      </Button>
      <Button auto color="error" onClick={handlerToDeleteModalConfirmBtn}>
        Yes, Confirm DELETE!
      </Button>
    </Modal.Footer>
  </Modal>
  
  {/* Modal to CONFIRM */}
  <Modal
    id = "confirm-add-modal"
    closeButton
    aria-labelledby="confirm-add-modal"
    open={showAddModal}
    onClose={handlerToHideAddModal}
  >
    <Modal.Header>
      <Text h2>Sure you want to ADD this to your Queue?</Text>
    </Modal.Header>
    <Modal.Body><Text h3>This will add this passage to your own personal queue.  You'll see it on your Dashhoard.</Text></Modal.Body>
    <Modal.Footer>
      <Button auto flat color="secondary" onClick={handlerToAddModalCancelBtn}>
        Nevermind, Go Back
      </Button>
      <Button auto color="success" onClick={handlerToAddModalConfirmBtn}>
        Yes, ADD it!
      </Button>
    </Modal.Footer>
  </Modal>

{/* MODALS  ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^  */}

    
    </Container>
  );
}
}

export default Dashboard;
