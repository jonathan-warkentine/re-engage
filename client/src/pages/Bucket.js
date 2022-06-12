import React, {useState} from "react";
import {
  Container,
  Text,
  Textarea,
  Button,
  Table,
  Tooltip,
  Spacer,
  Card,
  Dropdown,
  Row,
  Modal,
  useModal,
} from "@nextui-org/react";
import {useQuery} from "@apollo/client";
import {QUERY_ALL_PASSAGES, QUERY_ME} from "../utils/queries";
import {IconButton} from "../components/Icons/IconButton";
import {EyeIcon} from "../components/Icons/EyeIcon";
import {AddIcon} from "../components/Icons/AddIcon";
import {ADD_SESSION} from "../utils/mutations";
import {useMutation} from "@apollo/client";
import "../styles/Bucket.css";

function Bucket(props) {
  // MODAL STUFF ------------------------------
  // ------------------------------------------
  const [targetPassage, setTargetPassage] = useState({});
  const [addSession, {error}] = useMutation(ADD_SESSION);

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
  };

  // ------------------------------------------
  // MODAL STUFF ------------------------------

  const {loading, data: passagesObj} = useQuery(QUERY_ALL_PASSAGES);
  const {load, data: userObj} = useQuery(QUERY_ME);

  if (loading || load) {
    return <p>Loading...</p>;
  }
  const passageArr = passagesObj?.allPassages || [];
  const userSessions = userObj?.me.sessions || [];
  let passages = [];


  for (let i = 0; i < passageArr.length; i++) {
    let alreadyReading = false;
    for (let j = 0; j < userSessions.length; j++) {
      if (passageArr[i]._id === userSessions[j].passage._id) {
        alreadyReading = true;
      }
    }
    if (alreadyReading === false) {
      passages.push(passageArr[i]);
    }
  }

  return (
    <Container className="the-bucket-container">
      <h2>Available Passages You're Not Already Reading</h2>

      <Container className="current-engagements-box">
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
            <Table.Column width={5}>TITLE</Table.Column>
            <Table.Column width={3}>PROVIDED BY</Table.Column>
            <Table.Column width={1}>ACTIONS</Table.Column>
          </Table.Header>
          <Table.Body>
            {passages.map((passage) => (
              <Table.Row key={passage.title}>
                <Table.Cell>{passage.title}</Table.Cell>
                {passage.author ? (
                  <Table.Cell>{passage.author.name}</Table.Cell>
                ) : (
                  <Table.Cell> </Table.Cell>
                )}

                <Table.Cell>
                  <Tooltip color="secondary" content="SHOW passage preview">
                    <IconButton
                      onClick={() => {
                        setTargetPassage(passage);

                        handlerToShowPreviewModal();
                      }}
                    >
                      <EyeIcon size={20} fill="#979797" />
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
      </Container>

      <Spacer y={3} />

      {/* Modal to DELETE */}
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
          <Button auto color="success" onClick={handlerToPreviewModalAddBtn}>
            Back to The Bucket
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal to CONFIRM to QUEUE */}
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
            Add "{targetPassage.title}" to your Queue for Current Readings?
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
          <Button auto color="success" onClick={handlerToAddModalConfirmBtn}>
            Yes, ADD it!
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Bucket;
