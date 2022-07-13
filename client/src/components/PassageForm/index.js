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
  Row,
  Collapse
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

  const [loadingProgress, setLoadingProgress] = useState(0);

  function fillUpProgressMeter() {
    let i = 0;
    do {
      task(i);
      i++;
    } while (i < 99);
    function task(i) {
      setTimeout(function() {
        setLoadingProgress(i)
        console.log(i)
      }, 77 * i);
    }
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

  // ---------- ---------------- ---------------

  return (
    <Collapse bordered expanded className="submit-box" title='Submit New Passage . . . .'>
      <Textarea
        name="passageTitle"
        bordered
        fullWidth="true"
        value={passageText.passageTitle}
        minRows={1}
        maxRows={2}
        onChange={handleChange}
        color="success"
        placeholder="Title"
      ></Textarea>
      <Spacer y={0.5} />
      <Textarea
        name="passageBody"
        id="passageBody"
        fullWidth="true"
        bordered
        value={passageText.passageBody}
        minRows={3}
        maxRows={15}
        onChange={handleChange}
        color="success"
        placeholder="You can type or paste-in your passage text here."
      ></Textarea>
      <Spacer y={0.5}></Spacer>
      <Button ghost onClick={handleFormSubmit} color="success">Submit New Passage</Button>

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

    </Collapse>
  );
};


export default PassageForm;