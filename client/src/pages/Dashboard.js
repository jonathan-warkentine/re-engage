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
import {IconButton} from "./IconButton";
import {EyeIcon} from "./EyeIcon";
import {EditIcon} from "./EditIcon";
import {DeleteIcon} from "./DeleteIcon";
import {ResumeIcon} from "./ResumeIcon";
import {ClipboardIcon} from "./ClipboardIcon";
import "../styles/Dashboard.css";
import {useQuery} from "@apollo/client";
import {QUERY_ME} from "../utils/queries";
import {ADD_PASSAGE} from "../utils/mutations";
import Auth from "../utils/auth";
import PassageForm from '../components/PassageForm';

function Dashboard(props) {
  const {loading, data} = useQuery(QUERY_ME);

  console.log(Auth.getReader());
  if (loading) {
    return <p>Loading...</p>;
  }

  const user = data?.me || {};
  console.log(user);

  const allSingleReadings = user.passages;
  // console.log(allSingleReadings[0].passage.providedBy.name);
  const myContributions = [];

  for (let i = 0; i < allSingleReadings.length; i++) {
    if (allSingleReadings[i].passage.providedBy.name == user.name) {
      // console.log(allSingleReadings[i].passage.providedBy.name);
      // console.log(user.name);
      myContributions.push(allSingleReadings[i]);
    }
  }
  console.log("All Passages");
  console.log(allSingleReadings);
  console.log("My Contributions");
  console.log(myContributions);

  // const {almost, info} = useQuery(QUERY_MY_CONTRIBUTIONS);
  // const contributions = info?.me || {};
  // console.log(contributions);

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
            {myContributions.map((singleReading) => (
              <Table.Row key={singleReading.passage.title}>
                <Table.Cell>{singleReading.passage.title}</Table.Cell>
                <Table.Cell>
                  <Grid>
                    <Progress
                      color="primary"
                      value={
                        (singleReading.resumeAt /
                          singleReading.passage.splitBody.length) *
                        100
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
                  <Tooltip color="warning" content="EDIT passage">
                    <IconButton
                      onClick={() => console.log("EDIT button clicked")}
                    >
                      <EditIcon size={20} fill="#979797" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip color="error" content="DELETE passage">
                    <IconButton
                      onClick={() => console.log("DELETE button clicked")}
                    >
                      <DeleteIcon size={20} fill="#FF0080" />
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
            {allSingleReadings.map((singleReading) => (
              <Table.Row key={singleReading.passage.title}>
                <Table.Cell>{singleReading.passage.title}</Table.Cell>
                <Table.Cell>{singleReading.passage.providedBy.name}</Table.Cell>
                <Table.Cell>
                  <Grid>
                    <Progress
                      color="primary"
                      value={
                        (singleReading.resumeAt /
                          singleReading.passage.splitBody.length) *
                        100
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
    </Container>
  );
}

export default Dashboard;
