import React from "react";
import { Container, Text, Textarea, Button, Table, Tooltip, Progress, Grid, Spacer } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faEnvelope, faList } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { IconButton } from "./IconButton";
import { EyeIcon } from "./EyeIcon";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { ResumeIcon } from "./ResumeIcon";
import { ClipboardIcon } from "./ClipboardIcon";
import '../styles/Dashboard.css';


function Dashboard(props) {

  
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
              minWidth: "100%"
            }}>
              <Table.Header>
                <Table.Column width={6}>TITLE</Table.Column>
                <Table.Column width={3}>PROGRESS</Table.Column>
                <Table.Column width={3}>ACTIONS</Table.Column>
              </Table.Header>
              <Table.Body>
                <Table.Row key="1">
                  <Table.Cell>Preamble to the Constitution</Table.Cell>
                  <Table.Cell>
                    <Grid><Progress color="primary" value={30} /></Grid>
                  </Table.Cell>
                  <Table.Cell>
                    <Tooltip color="primary" content="SHOW passage preview">
                      <IconButton onClick={() => console.log("PREVIEW button clicked")}>
                        <EyeIcon size={20} fill="#979797" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip color="warning" content="EDIT passage">
                      <IconButton onClick={() => console.log("EDIT button clicked")}>
                        <EditIcon size={20} fill="#979797" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip color="error" content="DELETE passage">
                      <IconButton onClick={() => console.log("DELETE button clicked")}>
                        <DeleteIcon size={20} fill="#FF0080" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip color="success" content="RESUME passage">
                      <IconButton onClick={() => console.log("RESUME button clicked")}>
                        <ResumeIcon size={20} fill="#00cc00" />
                      </IconButton>
                    </Tooltip>
                  </Table.Cell>
                </Table.Row>
                <Table.Row key="2">
                  <Table.Cell>John 3</Table.Cell>
                  <Table.Cell>
                    <Grid><Progress color="primary" value={10} /></Grid>
                  </Table.Cell>
                  <Table.Cell>
                    <Tooltip color="primary" content="SHOW passage preview">
                      <IconButton onClick={() => console.log("PREVIEW button clicked")}>
                        <EyeIcon size={20} fill="#979797" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip color="warning" content="EDIT passage">
                      <IconButton onClick={() => console.log("EDIT button clicked")}>
                        <EditIcon size={20} fill="#979797" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip color="error" content="DELETE passage">
                      <IconButton onClick={() => console.log("DELETE button clicked")}>
                        <DeleteIcon size={20} fill="#FF0080" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip color="success" content="RESUME passage">
                      <IconButton onClick={() => console.log("RESUME button clicked")}>
                        <ResumeIcon size={20} fill="#00cc00" />
                      </IconButton>
                    </Tooltip>
                  </Table.Cell>
                </Table.Row>
                <Table.Row key="3">
                  <Table.Cell>Excerpt from 'Pilgrim's Progress'</Table.Cell>
                  <Table.Cell>
                    <Grid><Progress color="primary" value={65} /></Grid>
                  </Table.Cell>
                  <Table.Cell>
                    <Tooltip color="primary" content="SHOW passage preview">
                      <IconButton onClick={() => console.log("PREVIEW button clicked")}>
                        <EyeIcon size={20} fill="#979797" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip color="warning" content="EDIT passage">
                      <IconButton onClick={() => console.log("EDIT button clicked")}>
                        <EditIcon size={20} fill="#979797" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip color="error" content="DELETE passage">
                      <IconButton onClick={() => console.log("DELETE button clicked")}>
                        <DeleteIcon size={20} fill="#FF0080" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip color="success" content="RESUME passage">
                      <IconButton onClick={() => console.log("RESUME button clicked")}>
                        <ResumeIcon size={20} fill="#00cc00" />
                      </IconButton>
                    </Tooltip>
                  </Table.Cell>
                </Table.Row>
                <Table.Row key="4">
                  <Table.Cell>My Speech for Next Tuesday</Table.Cell>
                  <Table.Cell>
                    <Grid><Progress color="primary" value={80} /></Grid>
                  </Table.Cell>
                  <Table.Cell>
                    <Tooltip color="primary" content="SHOW passage preview">
                      <IconButton onClick={() => console.log("PREVIEW button clicked")}>
                        <EyeIcon size={20} fill="#979797" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip color="warning" content="EDIT passage">
                      <IconButton onClick={() => console.log("EDIT button clicked")}>
                        <EditIcon size={20} fill="#979797" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip color="error" content="DELETE passage">
                      <IconButton onClick={() => console.log("DELETE button clicked")}>
                        <DeleteIcon size={20} fill="#FF0080" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip color="success" content="RESUME passage">
                      <IconButton onClick={() => console.log("RESUME button clicked")}>
                        <ResumeIcon size={20} fill="#00cc00" />
                      </IconButton>
                    </Tooltip>
                  </Table.Cell>
                </Table.Row>
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
              minWidth: "100%"
            }}>
              <Table.Header>
                <Table.Column width={6}>TITLE</Table.Column>
                <Table.Column width={3}>PROGRESS</Table.Column>
                <Table.Column width={3}>ACTIONS</Table.Column>
              </Table.Header>
              <Table.Body>
                <Table.Row key="1">
                  <Table.Cell>Preamble to the Constitution</Table.Cell>
                  <Table.Cell>
                    <Grid><Progress color="primary" value={30} /></Grid>
                  </Table.Cell>
                  <Table.Cell>
                    <Tooltip color="primary" content="SHOW passage preview">
                      <IconButton onClick={() => console.log("PREVIEW button clicked")}>
                        <EyeIcon size={20} fill="#979797" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip color="success" content="RESUME passage">
                      <IconButton onClick={() => console.log("RESUME button clicked")}>
                        <ResumeIcon size={20} fill="#00cc00" />
                      </IconButton>
                    </Tooltip>
                  </Table.Cell>
                </Table.Row>
                <Table.Row key="2">
                  <Table.Cell>John 3</Table.Cell>
                  <Table.Cell>
                    <Grid><Progress color="primary" value={10} /></Grid>
                  </Table.Cell>
                  <Table.Cell>
                    <Tooltip color="primary" content="SHOW passage preview">
                      <IconButton onClick={() => console.log("PREVIEW button clicked")}>
                        <EyeIcon size={20} fill="#979797" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip color="success" content="RESUME passage">
                      <IconButton onClick={() => console.log("RESUME button clicked")}>
                        <ResumeIcon size={20} fill="#00cc00" />
                      </IconButton>
                    </Tooltip>
                  </Table.Cell>
                </Table.Row>
                <Table.Row key="3">
                  <Table.Cell>Excerpt from 'Pilgrim's Progress'</Table.Cell>
                  <Table.Cell>
                    <Grid><Progress color="primary" value={65} /></Grid>
                  </Table.Cell>
                  <Table.Cell>
                    <Tooltip color="primary" content="SHOW passage preview">
                      <IconButton onClick={() => console.log("PREVIEW button clicked")}>
                        <EyeIcon size={20} fill="#979797" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip color="success" content="RESUME passage">
                      <IconButton onClick={() => console.log("RESUME button clicked")}>
                        <ResumeIcon size={20} fill="#00cc00" />
                      </IconButton>
                    </Tooltip>
                  </Table.Cell>
                </Table.Row>
                <Table.Row key="4">
                  <Table.Cell>My Speech for Next Tuesday</Table.Cell>
                  <Table.Cell>
                    <Grid><Progress color="primary" value={80} /></Grid>
                  </Table.Cell>
                  <Table.Cell>
                    <Tooltip color="primary" content="SHOW passage preview">
                      <IconButton onClick={() => console.log("PREVIEW button clicked")}>
                        <EyeIcon size={20} fill="#979797" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip color="success" content="RESUME passage">
                      <IconButton onClick={() => console.log("RESUME button clicked")}>
                        <ResumeIcon size={20} fill="#00cc00" />
                      </IconButton>
                    </Tooltip>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
          </Table>
      </Container>

      <Spacer y={3} />

      <Container className="submit-box">
        <div className="submit-title-and-paste-button">
          <h3>Submit New Passage ... </h3>
            <Tooltip color="primary" content="PASTE from your clipboard">
              <IconButton onClick={() => console.log("RESUME button clicked")}>
                <ClipboardIcon size={26} fill="#00cc00" />
              </IconButton>
            </Tooltip>
        </div>
          
            <Textarea
              fullWidth="true"
              minRows={3}
              maxRows={15}
              bordered
              color="success"
              placeholder="You can type or paste-in your passage text here."></Textarea>
            <Button color="success">Submit New Passage</Button>
      </Container>
  </Container>
  )
};

export default Dashboard;
