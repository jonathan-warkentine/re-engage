import React from "react";
import { Container, Text, Card, Col, Row, Button, Modal } from '@nextui-org/react';
import ladyreading from '../images/ladyreading2.jpg';
import ribbon from '../images/blueribbon.png';

function LandingPage() {
  
  const [showModal1, setShowModal1] = React.useState(false);
  const handlerToShowModal1 = () => setShowModal1(true);
  const handlerToHideModal1 = () => setShowModal1(false);
  const handlerToModal1Button1 = () => {
    handlerToHideModal1();
    console.log("Modal 1, Button ONE pressed");
  };
  const handlerToModal1Button2 = () => {
    handlerToHideModal1();
    console.log("Modal 1, Button TWO pressed");
  };
  
  const [showModal2, setShowModal2] = React.useState(false);
  const handlerToShowModal2 = () => setShowModal2(true);
  const handlerToHideModal2 = () => setShowModal2(false);
  const handlerToModal2Button1 = () => {
    handlerToHideModal2();
    console.log("Modal 2, Button ONE pressed");
  };
  const handlerToModal2Button2 = () => {
    handlerToHideModal2();
    console.log("Modal 2, Button TWO pressed");
  };
  
  const [showModal3, setShowModal3] = React.useState(false);
  const handlerToShowModal3 = () => setShowModal3(true);
  const handlerToHideModal3 = () => setShowModal3(false);
  const handlerToModal3Button1 = () => {
    handlerToHideModal3();
    console.log("Modal 3, Button ONE pressed");
  };
  const handlerToModal3Button2 = () => {
    handlerToHideModal3();
    console.log("Modal 3, Button TWO pressed");
  };
  
  const [showModal4, setShowModal4] = React.useState(false);
  const handlerToShowModal4 = () => setShowModal4(true);
  const handlerToHideModal4 = () => setShowModal4(false);
  const handlerToModal4Button1 = () => {
    handlerToHideModal4();
    console.log("Modal 4, Button ONE pressed");
  };
  const handlerToModal4Button2 = () => {
    handlerToHideModal4();
    console.log("Modal 4, Button TWO pressed");
  };

  
  return (
  <Container>
  <Card css={{ w: "100%", h: "400px" }}>
    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
      <Col>
        <Text size={12} weight="bold" transform="uppercase" color="#3b2d1d">
          Intentional Comprehension Tool
        </Text>
        <Text h3 color="white">
          Take Meaningful Passages at a Deliberate Pace
        </Text>
        <Text h3 color="white">
          for Better Comprehension and Longer-Term Memory
        </Text>
      </Col>
    </Card.Header>
    <Card.Body css={{ p: 0 }}>
      <Card.Image
        src={ladyreading}
        objectFit="cover"
        width="100%"
        height="100%"
        alt="Relaxing app background"
      />
    </Card.Body>
    <Card.Footer
      isBlurred
      css={{
        position: "absolute",
        bgBlur: "#0f111466",
        borderTop: "$borderWeights$light solid $gray800",
        bottom: 0,
        zIndex: 1,
      }}
    >
      <Row>
        <Col>
          <Row>
            <Col span={3}>
              <Card.Image
                src={ribbon}
                css={{ bg: "black", br: "50%" }}
                height={40}
                width={40}
                alt="Breathing app icon"
              />
            </Col>
            <Col>
              <Text color="#d1d1d1" size={12}>
                Winner of the APPY Awards 2022
              </Text>
              <Text color="#d1d1d1" size={12}>
                for "Most Useful" and "Most Likely to Make Jeff Cringe"!
              </Text>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row justify="flex-end">
            <Button
              flat
              auto
              rounded
              css={{ color: "#94f9f0", bg: "#94f9f026" }}
              onClick={handlerToShowModal1}
            >
              <Text
                css={{ color: "inherit" }}
                size={12}
                weight="bold"
                transform="uppercase"
              >
                MODAL 1 TEST
              </Text>
            </Button>
            <Button
              flat
              auto
              rounded
              css={{ color: "#94f9f0", bg: "#94f9f026" }}
              onClick={handlerToShowModal2}
            >
              <Text
                css={{ color: "inherit" }}
                size={12}
                weight="bold"
                transform="uppercase"
              >
                MODAL 2 TEST
              </Text>
            </Button>
            <Button
              flat
              auto
              rounded
              css={{ color: "#94f9f0", bg: "#94f9f026" }}
              onClick={handlerToShowModal3}
            >
              <Text
                css={{ color: "inherit" }}
                size={12}
                weight="bold"
                transform="uppercase"
              >
                MODAL 3 TEST
              </Text>
            </Button>
            <Button
              flat
              auto
              rounded
              css={{ color: "#94f9f0", bg: "#94f9f026" }}
              onClick={handlerToShowModal4}
            >
              <Text
                css={{ color: "inherit" }}
                size={12}
                weight="bold"
                transform="uppercase"
              >
                MODAL 4 TEST
              </Text>
            </Button>
          </Row>
        </Col>
      </Row>
    </Card.Footer>
  </Card>


{/* MODALS \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/ */}

  <Modal
    id = "preview-body-modal"
    closeButton
    scroll
    width="600px"
    aria-labelledby="preview-body-modal"
    open={showModal1}
    onClose={handlerToHideModal1}
  >
    <Modal.Header>
      <Text h2>Preview this Passage</Text>
    </Modal.Header>
    <Modal.Body>
      <Text h4>This is the PASSAGE TITLE</Text>
      <Text>This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . This is the PASSAGE BODY. . . . </Text>
    </Modal.Body>
    <Modal.Footer>
      <Button auto flat color="secondary" onClick={handlerToModal1Button1}>
        Nope, nevermind. Not this one.
      </Button>
      <Button auto color="success" onClick={handlerToModal1Button2}>
        Add it to My Queue
      </Button>
    </Modal.Footer>
  </Modal>
  
  <Modal
    id = "edit-body-modal"
    closeButton
    scroll
    width="600px"
    aria-labelledby="edit-body-modal"
    open={showModal2}
    onClose={handlerToHideModal2}
  >
    <Modal.Header>
      <Text h2>Edit this Passage</Text>
    </Modal.Header>
    <Modal.Body>
      <Text h4>This is the PASSAGE TITLE</Text>
      <Text>This is the PASSAGE BODY that will be EDITTED. . . . This is the PASSAGE BODY that will be EDITTED. . . . This is the PASSAGE BODY that will be EDITTED. . . . This is the PASSAGE BODY that will be EDITTED. . . . This is the PASSAGE BODY that will be EDITTED. . . . This is the PASSAGE BODY that will be EDITTED. . . . This is the PASSAGE BODY that will be EDITTED. . . . This is the PASSAGE BODY that will be EDITTED. . . . This is the PASSAGE BODY that will be EDITTED. . . . This is the PASSAGE BODY that will be EDITTED. . . . This is the PASSAGE BODY that will be EDITTED. . . . This is the PASSAGE BODY that will be EDITTED. . . . This is the PASSAGE BODY that will be EDITTED. . . . </Text>
    </Modal.Body>
    <Modal.Footer>
      <Button auto flat color="secondary" onClick={handlerToModal2Button1}>
        Nope, don't want to change it.
      </Button>
      <Button auto color="warning" onClick={handlerToModal2Button2}>
        Yes, EDIT!
      </Button>
    </Modal.Footer>
  </Modal>
  
  <Modal
    id = "confirm-delete-modal"
    closeButton
    aria-labelledby="confirm-delete-modal"
    open={showModal3}
    onClose={handlerToHideModal3}
  >
    <Modal.Header>
      <Text h2>Confirm Delete?!?</Text>
    </Modal.Header>
    <Modal.Body><Text h4>This is the body of MODAL 3</Text></Modal.Body>
    <Modal.Footer>
      <Button auto flat color="secondary" onClick={handlerToModal3Button1}>
        Nevermind, Go Back
      </Button>
      <Button auto color="error" onClick={handlerToModal3Button2}>
        Yes, Confirm DELETE!
      </Button>
    </Modal.Footer>
  </Modal>
  
  <Modal
    id = "confirm-add-modal"
    closeButton
    aria-labelledby="confirm-add-modal"
    open={showModal4}
    onClose={handlerToHideModal4}
  >
    <Modal.Header>
      <Text h2>Sure you want to ADD this to your Queue?</Text>
    </Modal.Header>
    <Modal.Body><Text h3>This will add this passage to your own personal queue.  You'll see it on your Dashhoard.</Text></Modal.Body>
    <Modal.Footer>
      <Button auto flat color="secondary" onClick={handlerToModal4Button1}>
        Nevermind, Go Back
      </Button>
      <Button auto color="success" onClick={handlerToModal4Button2}>
        Yes, ADD it!
      </Button>
    </Modal.Footer>
  </Modal>

{/* MODALS  ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^  */}


  </Container>
  )
};

export default LandingPage;
