import React from "react";
import {
  Container,
  Text,
  Button,
  Tooltip,
  Grid,
  Spacer,
  Col,
  Card,
  Row
} from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faFolder } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import "../styles/Team.css";

import jonny from '../images/jonny2.jpg'
import mitch from '../images/mitch.jpg'
import ross from '../images/ross.jpg'
import patrick from '../images/patrick.jpg'

const teamMembers = [
  {
    fullName: "Ross McWey",
    simpleName: "Ross",
    tasks: "Bible API, Frontend",
    image: ross,
    buttonsColor: "success",
    textColor: {
      textGradient: "10deg, $blue600 -20%, $green600 50%"
    },
    githubLink: "https://github.com/RMcwey",
    linkedinLink: "https://www.linkedin.com/in/ross-mcwey-079347168/",
    portfolio: "https://rmcwey.github.io/My-Portfolio/",
    email: "rmcwey@hotmail.com"
  },
  {
    fullName: "Jonathan Warkentine",
    simpleName: "Jonny",
    tasks: "Game Logic, Backend",
    image: jonny,
    buttonsColor: "warning",
    textColor: {
      textGradient: "10deg, $red600 -20%, $yellow600 50%"
    },
    githubLink: "https://github.com/jonathan-warkentine/",
    linkedinLink: "https://www.linkedin.com/in/jonathan-warkentine-b72bb984/",
    portfolio: "http://warkentine.info",
    email: "jonathan.warkentine@gmail.com"
  },
  {
    fullName: "Mitchel Wachtel",
    simpleName: "Mitch",
    tasks: "Backend",
    image: mitch,
    buttonsColor: "primary",
    textColor: {
      textGradient: "10deg, $pink600 -20%, $blue600 50%"
    },
    githubLink: "https://github.com/mitchelwachtel",
    linkedinLink: "https://www.linkedin.com/in/mitchelwachtel/",
    portfolio: "http://mitchelwachtel.me/portfolio",
    email: "mitchel.wachtel@gmail.com"
  },
  
  {
    fullName: "Patrick Ham",
    simpleName: "Pat",
    tasks: "UI, Backend",
    image: patrick,
    buttonsColor: "error",
    textColor: {
      textGradient: "10deg, $purple600 -20%, $red600 50%"
    },
    githubLink: "https://github.com/PatrickFHam",
    linkedinLink: "https://www.linkedin.com/in/patrickfham/",
    portfolio: "https://patrickfham.github.io/ReactPortfolio",
    email: "patrick.f.ham@gmail.com"
  }
]

const Team = () => {
  return (
      <Container>
        <Col>
          
          <Text h2>The WHAMM! team:</Text>

          <Spacer y={1} />

          <Container id="container-for-cards" >
            {/* <Row gap={1} wrap="wrap" id="row-of-cards"> */}

            <Grid.Container gap={1} justify="space-between" >
              {teamMembers.map(item => (
              <Grid xs={6} sm={3}>
                <Card key={item.simpleName} css={{ w: "250px", h: "450px" }}>
                  <Card.Header css={{ position: "relative", zIndex: 1, top: 5 }}>
                    <Col>
                      <Text size={12} weight="bold" transform="uppercase" css={item.textColor}>
                        {item.tasks}
                      </Text>
                      <Text h3 css={item.textColor}>
                        {item.fullName}
                      </Text>
                    </Col>
                  </Card.Header>
                  <Card.Body css={{ p: 0 }}>
                    <Card.Image src={item.image} width="100%" height="100%" objectFit="cover" alt="Card example background" />
                  </Card.Body>
                  <Card.Footer css={{ position: "relative", borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)", bottom: 0, zIndex: 1, }} >
                    <Col>
                      <Row>
                          <Text color="white" size={16}>
                            Contact {item.simpleName}:
                          </Text>
                      </Row>
                    <Row>
                      <Col>
                        <Row justify="space-between" wrap="wrap">
                          <Tooltip content="Github" color={item.buttonsColor}>
                            <Button size="sm" ghost auto rounded color={item.buttonsColor} id="githublink" onClick={(e) => {
                                  e.preventDefault();
                                  window.open(`${item.githubLink}`, "_blank");
                                  }}>
                              <Text
                                css={{ color: "inherit" }}
                                size={18}
                                weight="bold"
                                transform="uppercase"
                              >
                                <FontAwesomeIcon icon={faGithub} />
                              </Text>
                            </Button>
                          </Tooltip>
                          <Tooltip content="LinkedIn" color={item.buttonsColor}>
                            <Button size="sm" ghost auto rounded color={item.buttonsColor} id="linkedinlink" onClick={(e) => {
                                  e.preventDefault();
                                  window.open(`${item.linkedinLink}`, "_blank");
                                  }}>
                              <Text
                                css={{ color: "inherit" }}
                                size={18}
                                weight="bold"
                                transform="uppercase"
                              >
                                <FontAwesomeIcon icon={faLinkedin} />
                              </Text>
                            </Button>
                          </Tooltip>
                          <Tooltip content="Portfolio" color={item.buttonsColor}>
                            <Button size="sm" ghost auto rounded color={item.buttonsColor} id="portfolio" onClick={(e) => {
                                  e.preventDefault();
                                  window.open(`${item.portfolio}`, "_blank");
                                  }}>
                              <Text
                                css={{ color: "inherit" }}
                                size={18}
                                weight="bold"
                                transform="uppercase"
                              >
                                <FontAwesomeIcon icon={faFolder} />
                              </Text>
                            </Button>
                          </Tooltip>
                          <Tooltip content="Email" color={item.buttonsColor}>
                            <Button size="sm" ghost auto rounded color={item.buttonsColor} id="email" onClick={() => window.location = `mailto:${item.email}`}>
                              <Text
                                css={{ color: "inherit" }}
                                size={18}
                                weight="bold"
                                transform="uppercase"
                              >
                                <FontAwesomeIcon icon={faEnvelope} />
                              </Text>
                            </Button>
                          </Tooltip>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  </Card.Footer>
                </Card>
              </Grid>
            ))}

          </Grid.Container>

          </Container>

        </Col>
      </Container>
  );
};

export default Team;
