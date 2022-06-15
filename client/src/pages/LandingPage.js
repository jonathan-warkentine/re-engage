import React from "react";
import { Container, Text, Card, Col, Row } from '@nextui-org/react';
import ladyreading from '../images/ladyreading2.jpg';
import ribbon from '../images/blueribbon.png';

function LandingPage() {
  
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
          </Row>
        </Col>
      </Row>
    </Card.Footer>
  </Card>
  </Container>
  )
};

export default LandingPage;
