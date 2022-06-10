import React, {useContext, useState} from "react";
import {
  Container,
  Text,
  Textarea,
  Button,
  Table,
  Tooltip,
  Progress,
  Grid,
  Spacer,
} from "@nextui-org/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faClipboard,
  faEnvelope,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faFacebook,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {IconButton} from "../../components/Icons/IconButton";
import {ClipboardIcon} from "../../components/Icons/ClipboardIcon";
import "../../styles/Dashboard.css"
import {ADD_PASSAGE} from "../../utils/mutations";
import Auth from "../../utils/auth";
import { useMutation } from '@apollo/client';

const PassageForm = () => {
  const [passageText, setPassageText] = useState({
    passageBody: "",
    passageTitle: "",
  });

  const userId = Auth.getReader().data._id;

  const [addPassage, {error}] = useMutation(ADD_PASSAGE);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(passageText.passageTitle);
    console.log(userId);
    console.log(passageText.passageBody);
    // On form submit, perform mutation and pass in form data object as arguments
    // It is important that the object fields are match the defined parameters in `ADD_THOUGHT` mutation
    try {
      const {data} = addPassage({
        variables: {
          title: passageText.passageTitle,
          providedBy: userId,
          fullText: passageText.passageBody,
        },
      });

      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const {name, value} = event.target;
    setPassageText({...passageText, [name]: value});
  };

  // ---------- ---------------- ---------------

  return (
    <Container  className="submit-box">
      <div className="submit-title-and-paste-button">
        <h3>Submit New Passage ... </h3>
        <Tooltip color="primary" content="PASTE from your clipboard">
          <IconButton onClick={() => console.log("RESUME button clicked")}>
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
      <Textarea
        name="passageBody"
        fullWidth="true"
        value={passageText.passageBody}
        minRows={3}
        maxRows={15}
        bordered
        onChange={handleChange}
        color="success"
        placeholder="You can type or paste-in your passage text here."
      ></Textarea>
      <Button onClick={handleFormSubmit} color="success">Submit New Passage</Button>
    </Container>
  );
};

export default PassageForm;
