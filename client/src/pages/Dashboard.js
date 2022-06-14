import React, {useState} from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Textarea,
  Text,
  Button,
  Table,
  Tooltip,
  Progress,
  Grid,
  Spacer,
  Modal,
  Collapse,
} from "@nextui-org/react";
import {IconButton} from "../components/Icons/IconButton";
import {EyeIcon} from "../components/Icons/EyeIcon";
import {EditIcon} from "../components/Icons/EditIcon";
import {DeleteIcon} from "../components/Icons/DeleteIcon";
import {ResumeIcon} from "../components/Icons/ResumeIcon";
import {AddIcon} from "../components/Icons/AddIcon";
import {RemoveIcon} from "../components/Icons/RemoveIcon";
import "../styles/Dashboard.css";
import {useQuery} from "@apollo/client";
import {QUERY_ME} from "../utils/queries";
import PassageForm from "../components/PassageForm";
import {
  ADD_SESSION,
  DELETE_PASSAGE,
  UPDATE_PASSAGE,
  DELETE_SESSION,
} from "../utils/mutations";
import {useMutation} from "@apollo/client";
import BibleApp from "../components/BibleApp";

function Dashboard(props) {
  const [targetPassage, setTargetPassage] = useState({});
  const [targetSession, setTargetSession] = useState({});
  const [updatedPassageText, setUpdatedPassageText] = useState({
    passageBody: "",
    passageTitle: "",
  });
  const [addSession, {error}] = useMutation(ADD_SESSION);
  const [deletePassage, {err}] = useMutation(DELETE_PASSAGE);
  const [updatePassage, {er}] = useMutation(UPDATE_PASSAGE);
  const [deleteSession, {e}] = useMutation(DELETE_SESSION);

  const handleChange = (event) => {
    const {name, value} = event.target;
    setUpdatedPassageText({...updatedPassageText, [name]: value});
  };

  // MODAL FUNCTIONS \/  \/  \/  \/  \/  \/  \/  \/  \/  \/
  // PREVIEW Modal
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const handlerToShowPreviewModal = (passage) => {
    setShowPreviewModal(true);
  };
  const handlerToHidePreviewModal = () => setShowPreviewModal(false);
  const handlerToPreviewModalCancelBtn = () => {
    handlerToHidePreviewModal();
  };
  const handlerToPreviewModalAddBtn = () => {
    handlerToHidePreviewModal();
  };

  // EDIT Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const handlerToShowEditModal = (passage) => {
    setShowEditModal(true);
  };
  const handlerToHideEditModal = () => setShowEditModal(false);
  const handlerToEditModalCancelBtn = () => {
    handlerToHideEditModal();
  };
  const handlerToEditModalConfirmBtn = async (event) => {
    event.preventDefault();
    handlerToHideEditModal();
    try {
      const data = await updatePassage({
        variables: {
          passageId: targetPassage._id,
          title: updatedPassageText.passageTitle,
          fullText: updatedPassageText.passageBody,
        },
      });
      
    } catch (err) {
      console.error(err);
    }
    refetch();
  };

  // REMOVE CONFIRM Modal
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const handlerToShowRemoveModal = (session) => {
    setShowRemoveModal(true);
  };
  const handlerToHideRemoveModal = () => setShowRemoveModal(false);
  const handlerToRemoveModalCancelBtn = () => {
    handlerToHideRemoveModal();
  };
  const handlerToRemoveModalConfirmBtn = async (event) => {
    event.preventDefault();
    handlerToHideRemoveModal();
    try {
      console.log(targetSession._id);
      const data = await deleteSession({
        variables: {
          sessionId: targetSession._id,
        },
      });

    } catch (err) {
      console.error(err);
    }
    refetch();
  };

  // DELETE CONFIRM Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handlerToShowDeleteModal = (passage) => {
    setShowDeleteModal(true);
  };
  const handlerToHideDeleteModal = () => setShowDeleteModal(false);
  const handlerToDeleteModalCancelBtn = () => {
    handlerToHideDeleteModal();
  };
  const handlerToDeleteModalConfirmBtn = async (event) => {
    event.preventDefault();
    handlerToHideDeleteModal();
    try {
      const data = await deletePassage({
        variables: {
          passageId: targetPassage._id,
        },
      });

    } catch (err) {
      console.error(err);
    }
    refetch();
  };

  // ADD CONFIRM Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const handlerToShowAddModal = () => {
    setShowAddModal(true);
  };
  const handlerToHideAddModal = () => setShowAddModal(false);
  const handlerToAddModalCancelBtn = () => {
    handlerToHideAddModal();
  };
  const handlerToAddModalConfirmBtn = async (event) => {
    event.preventDefault();
    handlerToHideAddModal();

    try {
      const data = await addSession({
        variables: {
          passageId: targetPassage._id,
        },
      });

    } catch (err) {
      console.error(err);
    }

    refetch();
  };
  // MODAL FUNCTIONS ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^

  const { loading, qMeErr, data, refetch } = useQuery(QUERY_ME, {
    fetchPolicy: 'network-only'
  });

  if (loading) {
    return <p>Loading...</p>;
  }
  if (data) {
    return (
      <Container className="dashboard-container">               
        <h2>{data.me.name.toUpperCase()} - Welcome to your Dashboard!</h2>
        <Spacer y={2} />
        <Collapse className="current-engagements-box"
         bordered expanded title="Currently Reading" css={{
          maxWidth:'100%',
          width:'100%'
        }} subtitle={
          <>
          Click <Text b>Here</Text> to open/close
          </>
          }
          > 
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
              {data.me.sessions?.map((session) => (
                <Table.Row key={session.passage.title}>
                  <Table.Cell>{session.passage.title}</Table.Cell>
                  <Table.Cell>{session.passage.author.name}</Table.Cell>
                  <Table.Cell>
                    <Grid>
                      <Progress
                        color="primary"
                        value={
                          (session.resumeAt /
                            session.passage.sentences?.length) *
                            100 || 0
                        }
                      />
                    </Grid>
                  </Table.Cell>
                  <Table.Cell>
                    <Tooltip color="primary" content="SHOW passage preview">
                      <IconButton
                        onClick={() => {
                          setTargetPassage(session.passage);

                          handlerToShowPreviewModal();
                        }}
                      >
                        <EyeIcon size={20} fill="#979797" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      color="warning"
                      content="Remove from Current Readings"
                    >
                      <IconButton
                        onClick={() => {
                          setTargetSession(session);
                          setTargetPassage(session.passage);
                          handlerToShowRemoveModal();
                        }}
                      >
                        <RemoveIcon size={20} fill="#ff9900" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip color="success" content="RESUME passage">
                      <IconButton as={Link} to={`/game/${session._id}`}>
                        <ResumeIcon size={20} fill="#00cc00" />
                      </IconButton>
                    </Tooltip>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Collapse>

        <Spacer y={2} />     
        <Collapse  className="my-contributions-box"
        bordered title="My Submissions" css={{
          maxWidth:'100%',
          width:'100%'
        }} subtitle={
          <>
          Click <Text b>Here</Text> to open/close
          </>
          }>              
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
              <Table.Column width={3}>ACTIONS</Table.Column>
            </Table.Header>
            <Table.Body>
              {data.me.passages?.map((passage) => (
                <Table.Row key={passage.title}>
                  <Table.Cell>{passage.title}</Table.Cell>
                  <Table.Cell>
                    <Tooltip color="primary" content="SHOW passage preview">
                      <IconButton
                        onClick={() => {
                          setTargetPassage(passage);
                          handlerToShowPreviewModal();
                        }}
                      >
                        <EyeIcon size={20} fill="#979797" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip color="warning" content="EDIT passage">
                      <IconButton
                        onClick={() => {
                          setTargetPassage(passage);
                          setUpdatedPassageText({
                            passageBody: passage.fullText,
                            passageTitle: passage.title,
                          });
                          handlerToShowEditModal();
                        }}
                      >
                        <EditIcon size={20} fill="#979797" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip color="error" content="DELETE passage">
                      <IconButton
                        onClick={() => {
                          setTargetPassage(passage);
                          handlerToShowDeleteModal();
                        }}
                      >
                        <DeleteIcon size={20} fill="#FF0080" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      color="primary"
                      content="Add to Current Reading Queue"
                    >
                      <IconButton
                        onClick={() => {
                          setTargetPassage(passage);
                          handlerToShowAddModal();
                        }}
                      >
                        <AddIcon size={20} fill="#00cc00" />
                      </IconButton>
                    </Tooltip>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Collapse>

        <Spacer y={2} />                
        {/*BIBLE APP*/}
        <BibleApp />

        <Spacer y={2} />
        <PassageForm refetch={refetch}/>
                          
        <Spacer y={2} />

        {/* MODALS \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/ */}

        {/* Modal to PREVIEW */}
        <Modal
          id="preview-body-modal"
          closeButton
          scroll
          width="600px"
          aria-labelledby="preview-body-modal"
          open={showPreviewModal}
          onClose={handlerToHidePreviewModal}
        >
          <Modal.Header>
            <Text h2>{targetPassage.title}</Text>
          </Modal.Header>
          <Modal.Body>
            <Text>{targetPassage.fullText}</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button auto color="secondary" onClick={handlerToPreviewModalAddBtn}>
              Back to My Dashboard
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal to EDIT */}
        <Modal
          id="edit-body-modal"
          closeButton
          scroll
          width="600px"
          aria-labelledby="edit-body-modal"
          open={showEditModal}
          onClose={handlerToHideEditModal}
        >
          <Modal.Header>
            <Text h2>EDIT {targetPassage.title}</Text>
          </Modal.Header>
          <Modal.Body>
            <Textarea
              name="passageTitle"
              fullWidth="true"
              value={updatedPassageText.passageTitle}
              minRows={1}
              maxRows={2}
              bordered
              onChange={handleChange}
              color="warning"
            ></Textarea>
            <Textarea
              name="passageBody"
              fullWidth="true"
              value={updatedPassageText.passageBody}
              minRows={5}
              maxRows={15}
              bordered
              onChange={handleChange}
              color="warning"
            ></Textarea>
          </Modal.Body>
          <Modal.Footer>
            <Button
              auto
              flat
              color="secondary"
              onClick={handlerToEditModalCancelBtn}
            >
              Nope, don't want to change it.
            </Button>
            <Button auto color="warning" onClick={handlerToEditModalConfirmBtn}>
              Yes, Confirm EDIT!
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal to DELETE */}
        <Modal
          id="confirm-delete-modal"
          closeButton
          aria-labelledby="confirm-delete-modal"
          open={showDeleteModal}
          onClose={handlerToHideDeleteModal}
        >
          <Modal.Header>
            <Text h2>DELETE {targetPassage.title}</Text>
          </Modal.Header>
          <Modal.Body>
            <Text h4>Are you sure you want to permanently DELETE "{targetPassage.title}"?</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button
              auto
              flat
              color="secondary"
              onClick={handlerToDeleteModalCancelBtn}
            >
              Nevermind, Go Back
            </Button>
            <Button auto color="error" onClick={handlerToDeleteModalConfirmBtn}>
              Yes, Confirm DELETE!
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal to REMOVE Session */}
        <Modal
          id="confirm-remove-modal"
          closeButton
          aria-labelledby="confirm-remove-modal"
          open={showRemoveModal}
          onClose={handlerToHideRemoveModal}
        >
          <Modal.Header>
            <Text h2>
              REMOVE {targetPassage.title}?
            </Text>
          </Modal.Header>
          <Text h3>
              REMOVE "{targetPassage.title}" to your from your Queue for Current Readings?
            </Text>
          <Modal.Footer>
            <Button
              auto
              flat
              color="secondary"
              onClick={handlerToRemoveModalCancelBtn}
            >
              Nevermind, Go Back
            </Button>
            <Button auto color="warning" onClick={handlerToRemoveModalConfirmBtn}>
              Yes, Confirm REMOVAL!
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal to CONFIRM */}
        <Modal
          id="confirm-add-modal"
          closeButton
          aria-labelledby="confirm-add-modal"
          open={showAddModal}
          onClose={handlerToHideAddModal}
        >
          <Modal.Header>
            <Text h2>{targetPassage.title}</Text>
          </Modal.Header>
          <Modal.Body>
            <Text h3>
              ADD "{targetPassage.title}" to your Queue for Current Readings?
            </Text>
          </Modal.Body>
          <Modal.Footer>
            <Button
              auto
              flat
              color="secondary"
              onClick={handlerToAddModalCancelBtn}
            >
              Nevermind, Go Back
            </Button>
            <Button auto color="primary" onClick={handlerToAddModalConfirmBtn}>
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
