import React from "react";
import { Container, Text, Card, Col, Row, Button, Modal } from '@nextui-org/react';
import ladyreading from '../images/ladyreading2.jpg';
import ribbon from '../images/blueribbon.png';

function LandingPage(props) {
  
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
          </Row>
        </Col>
      </Row>
    </Card.Footer>
  </Card>

  <Modal
    id = "MODAL1"
    closeButton
    aria-labelledby="confirm-delete-modal"
    open={showModal1}
    onClose={handlerToHideModal1}
  >
    <Modal.Header>
      <Text h3>MODAL 1</Text>
    </Modal.Header>
    <Modal.Body><Text h6>This is the body of MODAL 1</Text></Modal.Body>
    <Modal.Footer>
      <Button auto flat color="error" onClick={handlerToModal1Button1}>
        Close
      </Button>
      <Button auto onClick={handlerToModal1Button2}>
        Confirm DELETE
      </Button>
    </Modal.Footer>
  </Modal>
  
  <Modal
    id = "MODAL2"
    closeButton
    aria-labelledby="confirm-delete-modal"
    open={showModal2}
    onClose={handlerToHideModal2}
  >
    <Modal.Header>
      <Text h3>MODAL 2</Text>
    </Modal.Header>
    <Modal.Body><Text h6>This is the body of MODAL 2</Text></Modal.Body>
    <Modal.Footer>
      <Button auto flat color="error" onClick={handlerToModal2Button1}>
        Close
      </Button>
      <Button auto onClick={handlerToModal2Button2}>
        Confirm DELETE
      </Button>
    </Modal.Footer>
  </Modal>

  </Container>
  )
};

export default LandingPage;
