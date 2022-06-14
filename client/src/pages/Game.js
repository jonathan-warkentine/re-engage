import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { Container, Text, Button, Progress, Grid, Spacer, Card, Row, Col, Modal } from '@nextui-org/react';
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
  };
  const handlerToEndOfGameModalMenuBtn = async (event) => {
    event.preventDefault();
    handlerToHideEndOfGameModal();
    window.location.replace("/dashboard");
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
          return {
          ...word,
          display: true
        }
      }
      return word; 
    });

    // if very last sentence and all words are display:true,
    // trigger state change for 'congratulations' modal
    
    setWords(updatedWords)
    
  }

  function decrementSentence () {
    if(sentence.key === 0) {
      return;
    }
    const nextSentence = data.session.passage.blankedSentences.filter(s=>s.key===sentence.key-1);
    setSentence(nextSentence[0]);
    setWords(sentence.words);
  }

  function incrementSentence () {
    if(sentence.key === data.session.passage.blankedSentences.length-1) {
      return;
    }
    const nextSentence = data.session.passage.blankedSentences.filter(s=>s.key===sentence.key+1);
    
    setSentence(nextSentence[0]);
    setWords(nextSentence[0].words);

    incrementResumeAt({
      variables: {
        sessionId: data.session._id
      }
    });
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
                    {/* Here is where we should trigger "showEndOfGameModal" */}
                    <h5 color="#000" size={12}>{words.filter(word => !word.display).length ? "Select the correct word." : "Great job!" }</h5>
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
          id="confirm-add-modal"
          closeButton
          aria-labelledby="confirm-add-modal"
          open={showEndOfGameModal}
          onClose={handlerToHideEndOfGameModal}
        >
          <Modal.Header>
            <Text h2>Congratulations!</Text>
          </Modal.Header>
          <Modal.Body>
            <Text h3>You finished this passage!!</Text>
            <Text h4>What would you like to do?</Text>
          </Modal.Body>
          <Modal.Footer>
            <Col>
              <Button
                icon={<CloseIcon fill="currentColor" filled />}
                auto
                flat
                color="secondary"
                onClick={handlerToEndOfGameModalCloseBtn}
              >
                Close this Message
              </Button>
              <Button icon={<ReloadIcon fill="currentColor" filled />} auto color="success" onClick={handlerToEndOfGameModalReloadBtn}>
                Reload this Passage
              </Button>
              <Button icon={<MenuIcon fill="currentColor" filled />} auto color="primary" onClick={handlerToEndOfGameModalMenuBtn}>
                Go Back to Dashboard
              </Button>
            </Col>
          </Modal.Footer>
        </Modal>

        </Container>
      )  
    } else {
      return <h3>Loading...</h3>
    }
  } 
};

export default Game;
