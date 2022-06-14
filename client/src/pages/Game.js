import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { Container, Text, Button, Progress, Grid, Spacer, Card, Row, Col, Modal} from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import '../styles/Bucket.css';
import blueleather from '../images/blueleather.jpg';
import {ReloadIcon} from "../components/Icons/ReloadIcon";
import {CloseIcon} from "../components/Icons/CloseIcon";
import {MenuIcon} from "../components/Icons/MenuIcon";

import { shuffleArray } from '../utils/utils';
import { GET_SESSION } from "../utils/queries";
import { INC_RESUME_AT } from '../utils/mutations';

function Game () { 

  // END OF GAME MODAL
  const [showEndOfGameModal, setShowEndOfGameModal] = useState(false);
  const handlerToShowEndOfGameModal = (session) => {
    setShowEndOfGameModal(true);
  };
  const handlerToHideEndOfGameModal = () => setShowEndOfGameModal(false);
  const handlerToEndOfGameModalCloseBtn = () => {
    handlerToHideEndOfGameModal();
  };
  const handlerToEndOfGameModalReloadBtn = async (event) => {
    event.preventDefault();
    handlerToHideEndOfGameModal();
    // LOGIC TO RELOAD FROM BEGINNING OF THIS PASSAGE
    setSentence(data.session.passage.blankedSentences[0]);
    setWords(data.session.passage.blankedSentences[0].words);
  };

  const { sessionId } = useParams();
  const [ sentence, setSentence ] = useState();
  const [ words, setWords ] = useState();
  const { loading, error, data } = useQuery(GET_SESSION, {
    variables: {
      sessionId
    },
    onCompleted(data){
      setSentence(data.session.passage.blankedSentences[data.session.resumeAt]);
      setWords(data.session.passage.blankedSentences[data.session.resumeAt].words);
    },
    fetchPolicy: 'network-only'
  });

  const [ incrementResumeAt ] = useMutation(INC_RESUME_AT);
  
 

  function handleWordSelect(event) {
      const updatedWords = words.map(word => { 
        if (event.target.value == word.key && word.key == words.reduce(((prev, word) => word.display? prev: Math.min(prev, word.key)), 999)) { // we cannot use strict equality here
          
          // if it's the last sentence and the last word that's been guessed
          if (sentence.key == data.session.passage.blankedSentences.length-1 && words.filter(word => !word.display).length === 1) {
              handlerToShowEndOfGameModal();
          } 

            return {
            ...word,
            display: true
          }
        }
  
        return word; 
      });

      setWords(updatedWords)
  }

  function decrementSentence () {
    if(sentence.key === 0) {
      return;
    }
    const nextSentence = data.session.passage.blankedSentences.filter(s=>s.key===sentence.key-1);
    setSentence(nextSentence[0]);
    setWords(nextSentence[0].words);
  }

  async function incrementSentence () {
    if(sentence.key === data.session.passage.blankedSentences.length-1) {
      return;
    }

    const nextSentence = data.session.passage.blankedSentences.filter(s=>s.key===sentence.key+1);
    
    setSentence(nextSentence[0]);
    setWords(nextSentence[0].words);

    if (data.session.resumeAt !== data.session.passage.blankedSentences.length-1) {
      incrementResumeAt({
        variables: {
          sessionId: data.session._id
        }
      });
    }
  }

  if (loading) {
    return <h3>Loading...</h3>
  }

  if (data) {
    if (words && sentence) {
      return (
        <Container className="main-game-box">
          <h2>{data.session.passage.title}</h2>
          
          <Container justify="center">
      
          <Card css={{ bg: "$black", w: "100%" }}>
            <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
              <Col>
                <Text h4 color="white">
                  {words.map(word => word.display ? word.text : '___').join('  ')}
                </Text>
              </Col>
            </Card.Header>
            <Card.Image
              src={blueleather}
              width="100%"
              height={340}
              objectFit="cover"
              alt="Card image background"
            />
            <Card.Footer
              isBlurred="true"
              css={{
                bgBlur: "#0e1b2b",
                borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                bottom: 0,
                zIndex: 1,
              }}
            >
              <Col>
      
                <Row>
                  <Col>
                    <h5 color="#000" size={12}> Select the correct word.</h5>
                    <Row justify="space-around" id="word-list">
                      <Grid.Container justify="start">
                        {shuffleArray(words?.map((word, index) => (
                          word.display? null: 
                          <Button key={index} flat auto ripple rounded color="secondary" onPress={handleWordSelect} value={word.key}>
                            <Text
                              css={{ color: "inherit" }}
                              size={12}
                              weight="bold"
                            >
                              {word.text}
                            </Text>
                          </Button>
      
                        ))) }
                        
      
                      </Grid.Container>
                    </Row>
                  </Col>
                </Row>
                <Spacer y={1} />
                <Row><Progress color="secondary" value={(sentence.words.filter(word => !word.display).length-words.filter(word => word.display === false).length)/sentence.words.filter(word => !word.display).length*100} /></Row>
                
                <Spacer y={1} />
      
                <Row><Progress color="success" value={(sentence.key/(data?.session.passage.blankedSentences.length-1))*100} /></Row>
                <Row>
                  <Col>
                    <Row justify="flex-end">
                      <h5 color="#000" size={12}> {sentence.key+1} of {data?.session.passage.blankedSentences.length}</h5>
                      <Button.Group ripple flat bordered color="success">
                        <Button auto rounded color="inherit" onPress={decrementSentence}>
                          <Text css={{ color: "inherit" }} size={12} weight="bold">
                            <FontAwesomeIcon icon={faArrowLeftLong} />
                          </Text>
                        </Button>
                        <Button auto rounded color="inherit" onPress={incrementSentence}>
                          <Text css={{ color: "inherit" }} size={12} weight="bold">
                            <FontAwesomeIcon icon={faArrowRightLong} />
                          </Text>
                        </Button>
                      </Button.Group>
                    </Row>
                  </Col>
                </Row>
      
              </Col>
            </Card.Footer>
          </Card>
          </Container>

        {/* Modal to CONFIRM */}
        <Modal
          id="end-of-game-modal"
          closeButton
          aria-labelledby="end-of-game-modal"
          open={showEndOfGameModal}
          onClose={handlerToHideEndOfGameModal}
        >
          <Modal.Header>
            <Text h3>Congratulations!</Text>
          </Modal.Header>
          <Modal.Body>
            <Text h4>You finished this passage!!</Text>
            <Text h5>What would you like to do?</Text>
          </Modal.Body>
          <Modal.Footer>
            <Col>
              <Button icon={<CloseIcon filled/>} auto color="secondary" onClick={handlerToEndOfGameModalCloseBtn} >
                Close this Message
              </Button>
              <Button icon={<ReloadIcon fill="currentColor" filled />} auto color="success" onClick={handlerToEndOfGameModalReloadBtn}>
                Reload this Passage
              </Button>
              <Button as={Link} to={`/dashboard`} icon={<MenuIcon fill="currentColor" filled />} auto color="primary">
                Go Back to Dashboard
              </Button>
            </Col>
          </Modal.Footer>
        </Modal>

        </Container>
      )  
    } else {
      return <Container><h3>Loading...</h3></Container>
    }
  } 
};

export default Game;
