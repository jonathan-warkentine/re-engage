import React from "react";
import { Container, Text, Textarea, Button, Table, Tooltip, Progress, Grid, Spacer } from '@nextui-org/react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faClipboard, faEnvelope, faList } from '@fortawesome/free-solid-svg-icons';
// import { faGithub, faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { IconButton } from "./IconButton";
import { EyeIcon } from "./EyeIcon";
// import { EditIcon } from "./EditIcon";
// import { DeleteIcon } from "./DeleteIcon";
// import { ResumeIcon } from "./ResumeIcon";
import { AddIcon } from "./AddIcon";
import '../styles/Bucket.css';

function Bucket(props) {
  return (
  <Container className="the-bucket-container">
    <h2>Available Passages</h2>
    <Container className="current-engagements-box">
        <Table
            bordered
            lined
            aria-label="list-of-contributions"
            css={{
              height: "auto",
              minWidth: "100%"
            }}>
              <Table.Header>
                <Table.Column width={6}>TITLE</Table.Column>
                <Table.Column width={3}>ACTIONS</Table.Column>
              </Table.Header>
              <Table.Body>
                <Table.Row key="1">
                  <Table.Cell>Preamble to the Constitution</Table.Cell>
                  <Table.Cell>
                    <Tooltip color="secondary" content="SHOW passage preview">
                      <IconButton onClick={() => console.log("PREVIEW button clicked")}>
                        <EyeIcon size={20} fill="#979797" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip color="primary" content="ADD passage">
                      <IconButton onClick={() => console.log("ADD button clicked")}>
                        <AddIcon size={20} fill="#00cc00" />
                      </IconButton>
                    </Tooltip>
                  </Table.Cell>
                </Table.Row>
                <Table.Row key="2">
                  <Table.Cell>John 3</Table.Cell>
                  <Table.Cell>
                    <Tooltip color="secondary" content="SHOW passage preview">
                      <IconButton onClick={() => console.log("PREVIEW button clicked")}>
                        <EyeIcon size={20} fill="#979797" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip color="primary" content="ADD passage">
                      <IconButton onClick={() => console.log("ADD button clicked")}>
                        <AddIcon size={20} fill="#00cc00" />
                      </IconButton>
                    </Tooltip>
                  </Table.Cell>
                </Table.Row>
                <Table.Row key="3">
                  <Table.Cell>Excerpt from 'Pilgrim's Progress'</Table.Cell>
                  <Table.Cell>
                    <Tooltip color="secondary" content="SHOW passage preview">
                      <IconButton onClick={() => console.log("PREVIEW button clicked")}>
                        <EyeIcon size={20} fill="#979797" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip color="primary" content="ADD passage">
                      <IconButton onClick={() => console.log("ADD button clicked")}>
                        <AddIcon size={20} fill="#00cc00" />
                      </IconButton>
                    </Tooltip>
                  </Table.Cell>
                </Table.Row>
                <Table.Row key="4">
                  <Table.Cell>My Speech for Next Tuesday</Table.Cell>
                  <Table.Cell>
                    <Tooltip color="secondary" content="SHOW passage preview">
                      <IconButton onClick={() => console.log("PREVIEW button clicked")}>
                        <EyeIcon size={20} fill="#979797" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip color="primary" content="ADD passage">
                      <IconButton onClick={() => console.log("ADD button clicked")}>
                        <AddIcon size={20} fill="#00cc00" />
                      </IconButton>
                    </Tooltip>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
          </Table>
      </Container>
  </Container>
  )
};

export default Bucket;
