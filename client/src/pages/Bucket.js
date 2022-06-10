import React from "react";
import { Container, Text, Textarea, Button, Table, Tooltip, Spacer, Card, Dropdown, Row, Modal, useModal } from '@nextui-org/react';
import {useQuery} from "@apollo/client";
import {QUERY_ALL_PASSAGES} from "../utils/queries";
import { IconButton } from "./IconButton";
import { EyeIcon } from "./EyeIcon";
import { AddIcon } from "./AddIcon";

import '../styles/Bucket.css';

function Bucket(props) {
  
  // MODAL STUFF ------------------------------
  // ------------------------------------------
  
  const { setVisible, bindings } = useModal();

  function handlerForShowPreview (passage) {
    setVisible(true);
    console.log("PREVIEW button pressed");
    console.log(passage)
  };

  function handlerForAddPassage (passage) {
    setVisible(false);
    console.log("ADD button pressed");
    console.log(passage);
  };

  function handlerForClosePreviewModal() {
    setVisible(false);
    console.log("CLOSE button pressed");
  };

  function handlerForConfirm(id) {
    setVisible(false);
    console.log("CONFIRM ADD button pressed"); 
    return console.log(id);
  };
  
  // ------------------------------------------
  // MODAL STUFF ------------------------------


  const {loading, data} = useQuery(QUERY_ALL_PASSAGES);
  const passages = data?.passages || [];

  const [selectedBook, setSelectedBook] = React.useState(new Set(["Book"]));
  const selectedBookValue = React.useMemo(
    () => Array.from(selectedBook).join(", ").replaceAll("_", " "),
    [selectedBook]
  );
  
  const [selectedChapter, setSelectedChapter] = React.useState(new Set(["Chapter"]));
  const selectedChapterValue = React.useMemo(
    () => Array.from(selectedChapter).join(", ").replaceAll("_", " "),
    [selectedChapter]
  );

  const sampleScripture = `
  1 Now there was a man of the Pharisees named Nicodemus, a ruler of the Jews.
2 This man came to Jesus by night and said to him, "Rabbi, we know that you are a teacher come from God, for no one can do these signs that you do unless God is with him."
3 Jesus answered him, "Truly, truly, I say to you, unless one is born again he cannot see the kingdom of God."
4 Nicodemus said to him, "How can a man be born when he is old? Can he enter a second time into his mother's womb and be born?"
5 Jesus answered, "Truly, truly, I say to you, unless one is born of water and the Spirit, he cannot enter the kingdom of God.
6 That which is born of the flesh is flesh, and that which is born of the Spirit is spirit.
7 Do not marvel that I said to you, 'You must be born again.'
8 The wind blows where it wishes, and you hear its sound, but you do not know where it comes from or where it goes. So it is with everyone who is born of the Spirit."
9 Nicodemus said to him, "How can these things be?"
10 Jesus answered him, "Are you the teacher of Israel and yet you do not understand these things?
11 Truly, truly, I say to you, we speak of what we know, and bear witness to what we have seen, but you do not receive our testimony.
12 If I have told you earthly things and you do not believe, how can you believe if I tell you heavenly things?
13 No one has ascended into heaven except he who descended from heaven, the Son of Man.
14 And as Moses lifted up the serpent in the wilderness, so must the Son of Man be lifted up,
15 that whoever believes in him may have eternal life.
For God So Loved the World
16 "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.
17 For God did not send his Son into the world to condemn the world, but in order that the world might be saved through him.
18 Whoever believes in him is not condemned, but whoever does not believe is condemned already, because he has not believed in the name of the only Son of God.
19 And this is the judgment: the light has come into the world, and people loved the darkness rather than the light because their works were evil.
20 For everyone who does wicked things hates the light and does not come to the light, lest his works should be exposed.
21 But whoever does what is true comes to the light, so that it may be clearly seen that his works have been carried out in God."
John the Baptist Exalts Christ
22 After this Jesus and his disciples went into the Judean countryside, and he remained there with them and was baptizing.
23 John also was baptizing at Aenon near Salim, because water was plentiful there, and people were coming and being baptized
24 (for John had not yet been put in prison).
25 Now a discussion arose between some of John's disciples and a Jew over purification.
26 And they came to John and said to him, "Rabbi, he who was with you across the Jordan, to whom you bore witness--look, he is baptizing, and all are going to him."
27 John answered, "A person cannot receive even one thing unless it is given him from heaven.
28 You yourselves bear me witness, that I said, 'I am not the Christ, but I have been sent before him.'
29 The one who has the bride is the bridegroom. The friend of the bridegroom, who stands and hears him, rejoices greatly at the bridegroom's voice. Therefore this joy of mine is now complete.
30 He must increase, but I must decrease."
31 He who comes from above is above all. He who is of the earth belongs to the earth and speaks in an earthly way. He who comes from heaven is above all.
32 He bears witness to what he has seen and heard, yet no one receives his testimony.
33 Whoever receives his testimony sets his seal to this, that God is true.
34 For he whom God has sent utters the words of God, for he gives the Spirit without measure.
35 The Father loves the Son and has given all things into his hand.
36 Whoever believes in the Son has eternal life; whoever does not obey the Son shall not see life, but the wrath of God remains on him.`
  
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
                      onClick={() => {handlerForShowPreview(passage)}}
                    >
                      <EyeIcon size={20} fill="#979797" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip color="primary" content="ADD passage">
                    <IconButton onClick={() => {handlerForAddPassage(passage)}}>
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

    <Container className="add-scripture-box">
        <h4>Add Scripture Passage</h4>
        
        <Card>
            <Card.Body>
              <Row>
                
                <Dropdown id="book-dropdown">
                  <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
                    {selectedBookValue}
                  </Dropdown.Button>
                  <Dropdown.Menu
                    aria-label="book"
                    color="secondary"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedBook}
                    onSelectionChange={setSelectedBook}
                  >
                    <Dropdown.Item key="Matthew">Matthew</Dropdown.Item>
                    <Dropdown.Item key="Mark">Mark</Dropdown.Item>
                    <Dropdown.Item key="Luke">Luke</Dropdown.Item>
                    <Dropdown.Item key="John">John</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                
                <Dropdown id="chapter-dropdown">
                  <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
                    {selectedChapterValue}
                  </Dropdown.Button>
                  <Dropdown.Menu
                    aria-label="chapter"
                    color="secondary"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedChapter}
                    onSelectionChange={setSelectedChapter}
                  >
                    <Dropdown.Item key="1">1</Dropdown.Item>
                    <Dropdown.Item key="2">2</Dropdown.Item>
                    <Dropdown.Item key="3">3</Dropdown.Item>
                    <Dropdown.Item key="4">4</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Row>
              <Row>
                <Textarea fullWidth="true" minRows={5} initialValue={sampleScripture}></Textarea>
              </Row>

            </Card.Body>
            <Card.Divider />
            <Card.Footer>
              <Row justify="space-between">
                <p>All passages will be in the ole' King James Version... yea verily!</p>
                <Button shadow size="lg" color="success">Add to my Queue</Button>
              </Row>
            </Card.Footer>

        </Card>
    </Container>

    {passages.map((passage) => (
    <Modal
        key={passage._id}
        scroll
        width="600px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>{passage.title}</Text>
        </Modal.Header>
        <Modal.Body>
          <Text id="modal-description">{passage._id}</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={handlerForClosePreviewModal}>
            Nope, Nevermind
          </Button>
          <Button auto onClick={() => {handlerForConfirm(passage._id)}}>
            ADD to My Queue
          </Button>
        </Modal.Footer>
      </Modal>
    ))}

  </Container>
  )
};

export default Bucket;
