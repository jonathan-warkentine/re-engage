import React from "react";
import { Container, Text, Card, Col, Row, Button } from '@nextui-org/react';
import bluebook from '../images/blue-book2.webp';
import bookandgrass from '../images/bookandgrass.jpg';
import ladyreading from '../images/ladyreading2.jpg';

function LandingPage(props) {
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
                src="https://nextui.org/images/breathing-app-icon.jpeg"
                css={{ bg: "black", br: "50%" }}
                height={40}
                width={40}
                alt="Breathing app icon"
              />
            </Col>
            <Col>
              <Text color="#d1d1d1" size={12}>
                Breathing App
              </Text>
              <Text color="#d1d1d1" size={12}>
                Get a good night's sleep.
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
            >
              <Text
                css={{ color: "inherit" }}
                size={12}
                weight="bold"
                transform="uppercase"
              >
                Get App
              </Text>
            </Button>
          </Row>
        </Col>
      </Row>
    </Card.Footer>
  </Card>
  </Container>
  )
};

export default LandingPage;
