import React, {useState} from "react";
import {
  Container,
  Textarea,
  Button,
  Tooltip,
  Spacer,
  Progress,
  Modal,
  Text,
  Col,
  Row
} from "@nextui-org/react";
import {IconButton} from "../../components/Icons/IconButton";
import {ClipboardIcon} from "../../components/Icons/ClipboardIcon";
import "../../styles/Dashboard.css"
import {ADD_PASSAGE} from "../../utils/mutations";
import Auth from "../../utils/auth";
import { useMutation } from '@apollo/client';

const PassageForm = (props) => {
  
  // MODAL FOR LOADING ... FUNCTIONS   \/  \/  \/  \/  \/  
  const [showLoadingModal, setShowLoadingModal] = useState(false); 
  const handlerToShowLoadingModal = () => {
    setShowLoadingModal(true);
    console.log("opened loading modal")
  };
  const handlerToCloseLoadingModal = () => {
    setShowLoadingModal(false);
    console.log("closed loading modal")
  };

  const [loadingProgress, setLoadingProgress] = useState(1);

  function fillUpProgressMeter() {
    for (let i=1; i < 99; i++) {
      setInterval(setLoadingProgress(i), 1000);
    };
  };

  // MODAL FOR LOADING ... FUNCTIONS ^  ^  ^  ^  ^  ^  ^ 

  
  const [passageText, setPassageText] = useState({
    passageBody: "",
    passageTitle: "",
  });

  const userId = Auth.getReader().data._id;

  const [addPassage, {data, loading, error}] = useMutation(ADD_PASSAGE);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!passageText.passageBody || !passageText.passageTitle) {
      return;
    }
    // On form submit, perform mutation and pass in form data object as arguments
    // It is important that the object fields are match the defined parameters in `ADD_THOUGHT` mutation
    handlerToShowLoadingModal();
    try {
      const {data} = await addPassage({
        variables: {
          title: passageText.passageTitle,
          authorId: userId,
          fullText: passageText.passageBody,
        },
      });
    } catch (err) {
      console.error(err);
    }
    handlerToCloseLoadingModal();
    setPassageText({passageBody: "", passageTitle: ""});
    props.refetch();  
  };

  const handleChange = (event) => {
    const {name, value} = event.target;
    setPassageText({...passageText, [name]: value});
  };

  function pasteFromClipboard () {
    console.log("PASTE pressed");
  }

  // ---------- ---------------- ---------------

  return (
    <Container  className="submit-box">
      <div className="submit-title-and-paste-button">
        <h3>Submit New Passage . . . . </h3>
        <Tooltip color="success" content="PASTE from your clipboard">
          <IconButton onClick={pasteFromClipboard}>
            <ClipboardIcon size={26} fill="#00cc00" />
          </IconButton>
        </Tooltip>
      </div>
      <Textarea
        name="passageTitle"
        fullWidth="true"
        value={passageText.passageTitle}
        minRows={1}
        maxRows={2}
        bordered
        onChange={handleChange}
        color="success"
        placeholder="Title"
      ></Textarea>
      <Spacer y={0.5} />
      <Textarea
        name="passageBody"
        id="passageBody"
        fullWidth="true"
        value={passageText.passageBody}
        minRows={3}
        maxRows={15}
        bordered
        onChange={handleChange}
        color="success"
        placeholder="You can type or paste-in your passage text here."
      ></Textarea>
      <Button ghost onClick={handleFormSubmit} color="success">Submit New Passage</Button>
      <Button ghost onClick={handlerToShowLoadingModal} color="success">TEST SHOW MODAL</Button>


      {/* MODAL FOR LOADING \/  \/  \/  \/  \/  */}
      <Modal noPadding open={showLoadingModal} onOpen={fillUpProgressMeter} onClose={handlerToCloseLoadingModal}>
        <Modal.Body>
          <Container>
            <Col css={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center" }}>
              <Spacer y={2} />
              {/* <Loading size="xl" type="points-opacity"></Loading> */}
              <Progress indeterminated striped color="primary" />
              <Spacer y={1} />
              <Progress value={loadingProgress} color="success" />
              <Spacer y={1} />
              <Row justify="center"><Text h3>Loading</Text></Row>
              <Row justify="center"><Text h4>Using Natural Language Processing (NLP) to Process Your Passage!</Text></Row>
              <Spacer y={2} />
            </Col>
          </Container>
        </Modal.Body>
      </Modal>
      {/* MODAL FOR LOADING ^ ^ ^ ^ ^ ^ ^ ^ ^  */}

    </Container>
  );
};


export default PassageForm;
