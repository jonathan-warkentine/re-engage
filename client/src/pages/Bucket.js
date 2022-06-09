import React from "react";
import {Container, Table, Tooltip} from "@nextui-org/react";
import {useQuery} from "@apollo/client";
import {QUERY_ALL_PASSAGES} from "../utils/queries";
import {IconButton} from "./IconButton";
import {EyeIcon} from "./EyeIcon";
import {AddIcon} from "./AddIcon";
import "../styles/Bucket.css";

function Bucket(props) {
  const {loading, data} = useQuery(QUERY_ALL_PASSAGES);
  const passages = data?.passages || [];

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
               {passage.providedBy ? (
                 <Table.Cell>{passage.providedBy.name}</Table.Cell>
               ) : (<Table.Cell> </Table.Cell>)}
                
                <Table.Cell>
                  <Tooltip color="secondary" content="SHOW passage preview">
                    <IconButton
                      onClick={() => console.log("PREVIEW button clicked")}
                    >
                      <EyeIcon size={20} fill="#979797" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip color="primary" content="ADD passage">
                    <IconButton
                      onClick={() => console.log("ADD button clicked")}
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
    </Container>
  );
}

export default Bucket;
