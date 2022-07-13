import React, {useState} from "react";
import {
  Container,
  Textarea,
  Button,
  Spacer,
  Modal,
  Collapse,
  Loading,
  Text
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
  const [showSuccessModal, setShowSuccessModal] = useState(false); 

  const handlerToShowLoadingModal = () => {
    setShowLoadingModal(true);
  };
  const handlerToCloseLoadingModal = () => {
    setShowLoadingModal(false);
  };

  const handlerToShowSuccessModal = () => {
    setShowSuccessModal(true);
  };
  const handlerToCloseSuccessModal = () => {
    setShowSuccessModal(false);
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
    handlerToShowSuccessModal();
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
      <Modal open={showLoadingModal} onClose={handlerToCloseLoadingModal}>
        <Modal.Body>
          <Container align='center' justify="center" alignItems="center">
            <Loading>Using Natural Language Processing (NLP) to Process Your Passage!</Loading>
          </Container>
        </Modal.Body>
      </Modal>
      {/* MODAL FOR LOADING ^ ^ ^ ^ ^ ^ ^ ^ ^  */}

      <Modal open={showSuccessModal}>
        <Modal.Body>
          <Container align='center' justify="center" alignItems="center">
            <Text h2 color="success">Success!</Text>
            <Text>Find Your New Passage Under "My Submissions" Above!</Text>
            <Button color={'success'} onClick={handlerToCloseSuccessModal}>Done</Button>
          </Container>
        </Modal.Body>
      </Modal>

    </Collapse>
  );
};


export default PassageForm;